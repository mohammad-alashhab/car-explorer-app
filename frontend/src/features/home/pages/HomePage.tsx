import { motion } from "framer-motion";
import { Layout } from "../../../shared/components/layout/Layout";
import { Button } from "../../../shared/components/ui/Button";
import { Select } from "../../../shared/components/ui/Select";
import {
  useHomeSearch,
  buildYearOptions,
  ITEMS_PER_PAGE,
} from "../services/home.service";
import { ErrorMessage } from "../../../shared/components/child-components/ErrorMessage";
import { EmptyResults } from "../components/ui/EmptyResults";
import { Pagination } from "../../../shared/components/child-components/Pagination";
// import { SearchLoadingResults } from "../../../shared/components/child-components/SearchLoadingResults";
import { Search } from "lucide-react";
import { ResultsGrid } from "../components/ui/ResultsGrid";

export default function HomePage() {
  const {
    makes,
    vehicleTypes,
    selectedMakeId,
    selectedYear,
    selectedVehicleType,
    pageResults,
    totalResults,
    page,
    numPages,
    //makesLoading,
    //typesLoading,
    searchStatus,
    searchError,
    makesError,
    canSearch,
    handleMakeChange,
    handleYearChange,
    handleVehicleTypeChange,
    handleSearch,
    handlePageChange,
  } = useHomeSearch();

  const yearOptions = buildYearOptions();
  const makeOptions = makes.map((m) => ({ value: m.make_ID, label: m.make_Name }));
  const typeOptions = vehicleTypes.map((t) => ({
    value: t.vehicleTypeName,
    label: t.vehicleTypeName,
  }));

  const showingStart = (page - 1) * ITEMS_PER_PAGE + 1;
  const showingEnd = Math.min(page * ITEMS_PER_PAGE, totalResults);

  return (
    <Layout loading={searchStatus === "loading" && pageResults.length === 0}>
      {/* ── Hero + Search Panel ── */}
      <section className="relative bg-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(247,152,29,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Find Your <span className="text-primary">Vehicle</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
              Search thousands of makes, types, and models from the official
              vehicle database.
            </p>
          </motion.div>

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-6 sm:p-8"
          >
            {makesError && (
              <div className="mb-5">
                <ErrorMessage message={makesError} />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Select
                id="make-select"
                label="Make"
                options={makeOptions}
                value={selectedMakeId}
                onChange={(v) => handleMakeChange(Number(v) || null)}
                placeholder="Select make…"
                hideDefaultOption={true}
              />
              <Select
                id="type-select"
                label="Vehicle Type"
                options={typeOptions}
                value={selectedVehicleType}
                onChange={(v) => handleVehicleTypeChange(v ? String(v) : null)}
                placeholder="Select type (optional)"
                hideSearchInput={true}

                // placeholder={typesLoading ? "Loading…" : "Select type (optional)"}
                // loading={typesLoading}
                // disabled={!selectedMakeId || typesLoading}
              />
              <Select
                id="year-select"
                label="Year"
                options={yearOptions}
                value={selectedYear}
                onChange={(v) => handleYearChange(Number(v) || null)}
                hideDefaultOption={true}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                {canSearch
                  ? "search to find models."
                  : "Select a make and year to search."}
              </p>
              <Button
                size="lg"
                onClick={handleSearch}
                disabled={!canSearch}
                // loading={searchStatus === "loading"}
                className="w-full sm:w-auto"
              >
                <Search className="w-4 h-4" />
                Search Models
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Results ── */}
      {searchStatus !== "idle" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div
            className="w-full h-px bg-gray-100 mb-10"
            aria-hidden
          />

          {/* {searchStatus === "loading" && <SearchLoadingResults />} */}

          {searchStatus === "error" && (
            <div className="max-w-md mx-auto">
              <ErrorMessage message={searchError} />
            </div>
          )}

          {searchStatus === "success" && pageResults.length === 0 && (
            <EmptyResults />
          )}

          {searchStatus === "success" && pageResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Results</h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Showing{" "}
                    <span className="font-medium text-gray-700">
                      {showingStart}–{showingEnd}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-gray-700">{totalResults}</span>{" "}
                    models
                  </p>
                </div>
              </div>

              <ResultsGrid items={pageResults} />

              {numPages > 1 && (
                <Pagination
                  page={page}
                  numPages={numPages}
                  onPageChange={handlePageChange}
                />
              )}
            </motion.div>
          )}
        </section>
      )}
    </Layout>
  );
}
