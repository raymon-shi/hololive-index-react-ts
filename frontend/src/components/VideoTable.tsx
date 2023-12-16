import React, { FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IVideoDetails from "../../../shared/types/video-details";
import { TablePagination } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";

interface IProps {
  videos: IVideoDetails[];
}

const StatsTable: FC<IProps> = ({ videos }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getDurationString = (duration: string): string => {
    const momentDuration = moment.duration(duration);
    const hours = momentDuration.hours();
    const minutes = momentDuration.minutes();
    const seconds = momentDuration.seconds();

    const hoursString = hours ? `${hours} hours \n` : "";
    const minutesString = minutes ? `${minutes} minutes \n` : "";
    const secondsString = seconds ? `${seconds} seconds` : "";

    return hoursString + minutesString + secondsString;
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Thumbnail</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Published Date</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Views</TableCell>
            <TableCell align="right">Likes</TableCell>
            <TableCell align="right">Comments</TableCell>
            <TableCell align="right">Scheduled Time</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((video) => {
            const { id, title, thumbnailUrl, publishedAt, duration, views, likes, comments, scheduledStartTime, actualEndTime, actualStartTime } =
              video;
            return (
              <TableRow key={id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>
                  {
                    <Link to={`https://www.youtube.com/watch?v=${id}`}>
                      <img src={`${thumbnailUrl}`} width={100} />
                    </Link>
                  }
                </TableCell>
                <TableCell align="right">{title}</TableCell>
                <TableCell align="right">{`${new Date(publishedAt).toLocaleDateString()}`}</TableCell>
                <TableCell align="right">{getDurationString(duration)}</TableCell>
                <TableCell align="right">{views.toLocaleString()}</TableCell>
                <TableCell align="right">{likes.toLocaleString()}</TableCell>
                <TableCell align="right">{comments ? comments.toLocaleString() : null}</TableCell>
                <TableCell align="right">{`${new Date(scheduledStartTime).toLocaleString()}`}</TableCell>
                <TableCell align="right">{`${new Date(actualStartTime).toLocaleString()}`}</TableCell>
                <TableCell align="right">{`${new Date(actualEndTime).toLocaleString()}`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={videos.length}
        page={page}
        rowsPerPageOptions={[10, 25, 50, 100]}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default StatsTable;
