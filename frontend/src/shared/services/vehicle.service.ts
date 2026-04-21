import { fetcher } from "../utils/fetcher";
import type { Make, Model, VehicleType } from "../../features/home/types/vehicle.types";

export const getMakes = (): Promise<Make[]> => fetcher("/cars/makes");

export const getVehicleTypes = (makeId: number): Promise<VehicleType[]> =>
  fetcher(`/cars/types/${makeId}`);

export const getModels = (makeId: number, year: number, type?: string): Promise<Model[]> =>
  fetcher(`/cars/models?makeId=${makeId}&year=${year}${type ? `&type=${type}` : ""}`);
