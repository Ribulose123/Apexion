"use client";
import React, { useMemo, useState } from "react";
import { ChevronDown, Copy, Search } from "lucide-react";
import Image from "next/image";
import { CopyProfiles } from "@/app/data/data";

import { useRouter } from "next/navigation";

const LeaderContentMore = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    country: "Country",
    traderType: "Trade Type",
    availableOnly: false,
    timePeriod: "7D",
  });

  const filterOptions = useMemo(() => {
    const countries = [
      ...new Set(CopyProfiles.map((p) => p.country).filter(Boolean)),
    ];
    const traderTypes = [
      ...new Set(CopyProfiles.map((p) => p.traderType).filter(Boolean)),
    ];

    return {
      countries: ["Country", ...countries],
      traderTypes: ["Trade Type", ...traderTypes],
      timePeriods: ["7D", "30D", "90D", "All Time"],
    };
  }, []);

  const filteredData = useMemo(() => {
    return CopyProfiles.filter((profile) => {
      const countryMatch =
        filters.country === "Country" || profile.country === filters.country;
      const traderTypeMatch =
        filters.traderType === "Trade Type" ||
        profile.traderType === filters.traderType;
      const availableMatch = !filters.availableOnly || profile.online;

      return countryMatch && traderTypeMatch && availableMatch;
    });
  }, [filters]);

  const handleFilterChange = (filterType: string, value: string | boolean) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };
  const handleNavigation = (codyId: number) => {
    router.push(`/copy/${codyId}`);
  };
  return (
    <div className="">
      {/* Filter controls */}
      <div className="space-x-1 md:space-x-6 flex items-center ">
        {/* Time period filter */}
        <div className="relative inline-block">
          <select
            value={filters.timePeriod}
            onChange={(e) => handleFilterChange("timePeriod", e.target.value)}
            className="bg-[#01040F] rounded px-3 py-2 text-white appearance-none focus:outline-none pr-8 text-sm md:text-base w-20"
          >
            {filterOptions.timePeriods.map((period) => (
              <option value={period} key={period}>
                {period}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Country filter */}
        <div className="relative inline-block">
          <select
            value={filters.country}
            onChange={(e) => handleFilterChange("country", e.target.value)}
            className="bg-[#01040F] rounded px-3 py-2 text-white focus:outline-none appearance-none pr-8 text-sm md:text-base w-25"
          >
            {filterOptions.countries.map((country) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Trader type filter */}
        <div className="relative inline-block">
          <select
            value={filters.traderType}
            onChange={(e) => handleFilterChange("traderType", e.target.value)}
            className="bg-[#01040F] rounded px-3 py-2 text-white appearance-none focus:outline-none pr-8 text-sm md:text-base w-35"
          >
            {filterOptions.traderTypes.map((trade) => (
              <option value={trade} key={trade}>
                {trade}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Available traders toggle */}
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={filters.availableOnly}
            onChange={(e) =>
              handleFilterChange("availableOnly", e.target.checked)
            }
            className="bg-[#01040F] rounded px-3 py-2"
          />
          <label className="text-[#E8E8E8B2] text-[14px]">
            Available Master Traders
          </label>
        </div>
      </div>

      <div className="flex gap-2 mt-2 md:hidden">
        <div className="relative inline-block">
          <input
            type="text"
            placeholder="Search..."
            className="w- bg-[#10131F] px-3 py-2 pr-7 rounded-full text-sm text-gray-200 focus:outline-none placeholder:text-[#E8E8E8] placeholder:text-[12px] border border-[#2D2F3D]"
          />
          <Search
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#E8E8E8]"
            size={14}
          />
        </div>

        {/* Daily Picks button - fixed width */}
        <button className="bg-gradient-to-r from-[#439A86] to-[#283F3B] hover:bg-teal-700 text-white border border-[#439A8636] text-[12px] rounded-md px-3 py-2 whitespace-nowrap flex-shrink-0">
          Daily Picks
        </button>
      </div>
      {/* Table content Desktop*/}
      <div className="">
        <table className="w-full hidden md:table">
          {/* Table Header */}
          <thead className="border-[#141E32] border-b border-t py-1">
            <tr>
              <th className="px-6 py-4 text-left text-gray-300 text-[13px] font-medium">
                Name
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                {filters.timePeriod} ROI %
                {/*  <div className="">
                  <ChevronUp size={12}/>
                  <ChevronDown size={12}/>
                </div> */}
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                {filters.timePeriod} Maxdown PnL %
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                {filters.timePeriod} Followers&#39; PnL %
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                {filters.timePeriod} Win Rate %
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                Stability Index
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                Followers
              </th>
              <th className="px-4 py-4 text-center text-gray-300 text-[13px] font-medium">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#141E32]">
            {filteredData.length > 0 ? (
              filteredData.map((profile) => (
                <tr
                  key={profile.id}
                  onClick={() => handleNavigation(profile.id)}
                  className="hover:bg-gray-750 transition-colors"
                >
                  {/* Name Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={profile.image || "/img/Avatar DP.png"}
                            alt={`${profile.name}'s avatar`}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        {profile.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium flex items-center space-x-1">
                          <span>{profile.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-[#01BC8D1F] text-[8px] text-[#01BC8D] px-1 rounded">
                            stable
                          </span>
                          <span className="bg-[#01BC8D1F] text-[8px] text-[#01BC8D] px-1 rounded">
                            win streak
                          </span>
                          <span className="bg-[#6967AE1F] text-[8px] text-[#6967AE] px-1 rounded">
                            trend trader
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* ROI % */}
                  <td className="px-4 py-4 text-center">
                    <div
                      className={`${
                        profile.pnl >= 0 ? "text-green-400" : "text-red-400"
                      } font-medium`}
                    >
                      {profile.pnl >= 0 ? "+" : ""}
                      {profile.pnl}%
                    </div>
                  </td>

                  {/* Maxdown PnL % */}
                  <td className="px-4 py-4 text-center">
                    <div className="text-white">+{profile.roe.toFixed(2)}%</div>
                  </td>

                  {/* Followers' PnL % */}
                  <td className="px-4 py-4 text-center">
                    <div className="text-white">+{profile.eps.toFixed(2)}%</div>
                  </td>

                  {/* Win Rate % */}
                  <td className="px-4 py-4 text-center">
                    <div className="text-white">
                      {(
                        (profile.win / (profile.win + profile.lose)) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </td>

                  {/* Stability Index */}
                  <td className="px-4 py-4 text-center">
                    <div className="text-white">3.50/5</div>
                  </td>

                  {/* Followers */}
                  <td className="px-4 py-4 text-center">
                    <div className="text-white">
                      {profile.customers.last30Days.toLocaleString()}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-4 text-center">
                    <button className="bg-[#6967AE36] border border-[#282740] text-[#6967AE] px-4 py-2 rounded text-sm font-medium transition-colors flex items-center space-x-2 mx-auto">
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-400">
                  No traders match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Table content Mobile */}
      <div className="block md:hidden mt-10 p-2">
        <div className="">
          {filteredData.length > 0 ? (
            filteredData.map((profile) => (
              <div key={profile.id} className="py-2 border-b border-[#141E32]" onClick={() => handleNavigation(profile.id)}>
                {/* Name */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={profile.image || "/img/Avatar DP.png"}
                          alt={`${profile.name}'s avatar`}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      {profile.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                      )}
                    </div>
                    <div>
                      <div className="text-white font-medium flex items-center space-x-1">
                        <span>{profile.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-[#01BC8D1F] text-[8px] text-[#01BC8D] p-2 rounded">
                          stable
                        </span>
                        <span className="bg-[#01BC8D1F] text-[8px] text-[#01BC8D] p-2 rounded">
                          win streak
                        </span>
                        <span className="bg-[#6967AE1F] text-[8px] text-[#6967AE] p-2 rounded">
                          trend trader
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-[#6967AE36] border border-[#282740] text-[#6967AE] px-2 rounded text-[12px] font-medium transition-colors flex items-center space-x-2 ">
                    <Copy className="w-3 h-3" size={10} />
                    <span>Copy</span>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div>
                    <div className="text-[12px] flex items-center gap-2">
                      <p className="text-[#E8E8E8B2]">7D RIO</p>
                      <div
                        className={`${
                          profile.pnl >= 0 ? "text-green-400" : "text-red-400"
                        } font-medium`}
                      >
                        {profile.pnl >= 0 ? "+" : ""}
                        {profile.pnl}%
                      </div>
                    </div>

                    <div className="text-[12px] flex items-center gap-2">
                      <p className="text-[#E8E8E8B2]">Followe(2)</p>
                      <div className="text-white text-[15px]">72</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[12px] flex items-center gap-2">
                      <p className="text-[#E8E8E8B2]">Stability Index</p>
                      <div className="text-white text-[15px]">25/50</div>
                    </div>

                    <div className="text-[12px] flex items-center gap-2">
                      <p className="text-[#E8E8E8B2]">7d masters’ PnL</p>
                      <div className="text-white text-[15px]">+154.17</div>
                    </div>
                  </div>


                 <div>
                    <div className="text-[12px] flex items-center gap-2">
                      <p className="text-[#E8E8E8B2]">Stability Index</p>
                      <div className="text-white text-[15px]">25/50</div>
                    </div>

                    <div className="text-[12px] flex items-center gap-2">
                      <p className="text-[#E8E8E8B2]">7d masters’ PnL</p>
                      <div className="text-white text-[15px]">+154.17</div>
                    </div>
                  </div>
                </div>

                
              </div>
            ))
          ) : (
            <p>No traders match your filters</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderContentMore;
