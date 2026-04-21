import { useState, useEffect } from "react";
import {
  getMakes,
  getVehicleTypes,
  getModels,
} from "../../../shared/services/vehicle.service";
import type { Make, VehicleType } from "../types/vehicle.types";

export const ITEMS_PER_PAGE = 12;

export type SearchStatus = "idle" | "loading" | "success" | "error";

export interface ResultItem {
  id: number;
  modelName: string;
  makeName: string;
  year: number;
}

export function buildYearOptions(): { value: number; label: string }[] {
  const current = new Date().getFullYear();
  return Array.from({ length: current - 1979 }, (_, i) => ({
    value: current - i,
    label: String(current - i),
  }));
}

export function useHomeSearch() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(474);
  const [selectedYear, setSelectedYear] = useState<number | null>(2015);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(null);
  const [allResults, setAllResults] = useState<ResultItem[]>([]);
  const [page, setPage] = useState(1);

  const [makesLoading, setMakesLoading] = useState(true);
  const [typesLoading, setTypesLoading] = useState(false);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
  const [searchError, setSearchError] = useState("");
  const [makesError, setMakesError] = useState("");

  const canSearch = selectedMakeId !== null && selectedYear !== null;
  const numPages = Math.ceil(allResults.length / ITEMS_PER_PAGE);
  const pageResults = allResults.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const defaultMakeId = 474;
    const defaultYear = 2015;
    
    //// eslint-disable-next-line react-hooks/set-state-in-effect
    //setSelectedMakeId(defaultMakeId);
    //setSelectedYear(defaultYear);
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchStatus("loading");
    
    Promise.all([
      getMakes(),
      getVehicleTypes(defaultMakeId),
    ])
      .then(([makesData, typesData]) => {
        setMakes(makesData);
        setVehicleTypes(typesData);
      
        const make = makesData.find((m) => m.make_ID === defaultMakeId);
      
        return getModels(defaultMakeId, defaultYear).then((models) => {
          setAllResults(
            models.map((m) => ({
              id: m.model_ID,
              modelName: m.model_Name,
              makeName: make?.make_Name ?? "",
              year: defaultYear,
            }))
          );
          setSearchStatus("success");
        });
      })
      .catch(() => {
        setMakesError("Failed to load vehicle makes");
        setSearchError("Failed to load initial data");
        setSearchStatus("error");
      })
      .finally(() => {
        setMakesLoading(false);
      });
  }, []);

  function handleMakeChange(makeId: number | null) {
    setSelectedMakeId(makeId);
    setVehicleTypes([]);
    setSelectedVehicleType(null);

    if (!makeId) return;

    setTypesLoading(true);
    getVehicleTypes(makeId)
      .then(setVehicleTypes)
      .catch(() => {})
      .finally(() => setTypesLoading(false));
  }

  async function handleSearch() {
    if (!canSearch) return;
    setSearchStatus("loading");
    setSearchError("");
    setAllResults([]);
    const make = makes.find((m) => m.make_ID === selectedMakeId);
    try {
      const data = await getModels(selectedMakeId!, selectedYear!, selectedVehicleType ?? undefined);
      setAllResults(
        data.map((m) => ({
          id: m.model_ID,
          modelName: m.model_Name,
          makeName: make?.make_Name ?? "",
          year: selectedYear!,
        }))
      );
      setPage(1);
      setSearchStatus("success");
    } catch {
      setSearchError("Could not load results. Please try again.");
      setSearchStatus("error");
    }
  }

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > numPages) return;
    setPage(newPage);
  }

  return {
    makes,
    vehicleTypes,
    selectedMakeId,
    selectedYear,
    selectedVehicleType,
    pageResults,
    totalResults: allResults.length,
    page,
    numPages,
    makesLoading,
    typesLoading,
    searchStatus,
    searchError,
    makesError,
    canSearch,
    handleMakeChange,
    handleYearChange: (year: number | null) => setSelectedYear(year),
    handleVehicleTypeChange: (type: string | null) => setSelectedVehicleType(type),
    handleSearch,
    handlePageChange,
  };
}
