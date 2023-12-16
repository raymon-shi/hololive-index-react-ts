import { corporation, platform } from "../../../shared/types/constants";
import IInitialData from "../../../shared/types/initial-data";

const hololiveEnglishMyth: IInitialData[] = [
  {
    name: "Mori Calliope",
    id: "UCL_qhgtOy0dy1Agp8vkySQg",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
  {
    name: "Takanashi Kiara",
    id: "UCHsx4Hqa-1ORjQTh9TYDhww",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
  {
    name: "Ninomae Ina'nis",
    id: "UCMwGHR0BTZuLsmjY_NT5Pwg",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
  {
    name: "Gawr Gura",
    id: "UCoSrY_IQQVpmIRZ9Xf-y93g",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
  {
    name: "Watson Amelia",
    id: "UCyl1z3jo3XHR1riLFKG5UAg",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
];

const hololiveEnglishPromise: IInitialData[] = [
  {
    name: "Ceres Fauna",
    id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
  {
    name: "Ouro Kronii",
    id: "UCmbs8T6MWqUHP1tIQvSgKrg",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
  {
    name: "Nanashi Mumei",
    id: "UC3n5uGu18FoCy23ggWWp8tA",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
  {
    name: "Hakos Baelz",
    id: "UCgmPnx-EEeOrZSg5Tiw7ZRQ",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
  {
    name: "IRyS",
    id: "UC8rcEBzJSleTkf_-agPM20g",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
  {
    name: "Tsukumo Sana",
    id: "UCsUj0dszADCGbF3gNrQEuSQ",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
];

const hololiveEnglishAdvent: IInitialData[] = [
  {
    name: "Shiori Novella",
    id: "UCgnfPPb9JI3e9A4cXHnWbyg",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
  {
    name: "Koseki Bijou",
    id: "UC9p_lqQ0FEDz327Vgf5JwqA",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
  {
    name: "Nerissa Ravencroft",
    id: "UC_sFNM0z0MWm9A6WlKPuMMg",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
  {
    name: "Fuwawa Abyssguard and Mococo Abyssguard",
    id: "UCt9H_RpQzhxzlyBxFqrdHqA",
    platform: platform.YouTube,
    corporation: corporation.Hololive,
  },
];

const hololive = [hololiveEnglishMyth, hololiveEnglishPromise, hololiveEnglishAdvent];

export { hololive, hololiveEnglishMyth, hololiveEnglishPromise, hololiveEnglishAdvent };
