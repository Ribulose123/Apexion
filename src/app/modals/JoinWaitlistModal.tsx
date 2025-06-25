import React, {useState} from 'react'
import countries from 'countries-list';
import ReactCountryFlag from 'react-country-flag';

// Convert countries object to array
const countriesList = Object.entries(countries.countries).map(([code, country]) => ({
  code,
  name: country.name,
}));
const JoinWaitlistModal = () => {
     const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCountries = countriesList.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

interface Country {
    code: string;
    name: string;
}

const handleCountrySelect = (country: Country): void => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchTerm('');
};

  if (!isOpen) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Waitlist Modal
        </button>
      </div>
    );
  }
  return (
     <div className="min-h-screen bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-100 rounded-2xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Join the waitlist
        </h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Country Dropdown */}
        {isDropdownOpen && (
          <div className="absolute z-10 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mb-4">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountrySelect(country)}
                className="w-full flex items-center px-4 py-3 hover:bg-gray-100 transition-colors text-left"
              >
                <ReactCountryFlag 
                  countryCode={country.code}
                  svg
                  style={{
                    width: '1.5em',
                    height: '1.5em',
                    marginRight: '0.75rem'
                  }}
                />
                <span className="text-gray-700">{country.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Selected Countries */}
        <div className="space-y-3 mb-8">
          {selectedCountry && (
            <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
              <div className="flex items-center">
                <ReactCountryFlag 
                  countryCode={selectedCountry.code}
                  svg
                  style={{
                    width: '1.5em',
                    height: '1.5em',
                    marginRight: '0.75rem'
                  }}
                />
                <span className="text-gray-700">{selectedCountry.name}</span>
              </div>
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        {/* Register Button */}
        <button 
          onClick={() => {
            if (selectedCountry) {
              alert(`Registered for waitlist from ${selectedCountry.name}!`);
            } else {
              alert('Please select a country first');
            }
          }}
          disabled={!selectedCountry}
          className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-4 px-4 rounded-lg transition-colors"
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default JoinWaitlistModal
