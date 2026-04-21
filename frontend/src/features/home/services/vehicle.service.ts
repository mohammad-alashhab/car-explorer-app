import { fetcher } from "../../../shared/utils/fetcher";

export const getMakes = () => fetcher("/cars/makes");

export const getVehicleTypes = (makeId: number) =>
  fetcher(`/cars/types/${makeId}`);

export const getModels = (makeId: number, year: number) =>
  fetcher(`/cars/models?makeId=${makeId}&year=${year}`);