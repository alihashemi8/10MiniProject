import React, { useState, useEffect } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const currencyData = [
  { code: 'USD', country: 'United States', flag: '🇺🇸' },
  { code: 'EUR', country: 'Eurozone', flag: '🇪🇺' },
  { code: 'JPY', country: 'Japan', flag: '🇯🇵' },
  { code: 'GBP', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AUD', country: 'Australia', flag: '🇦🇺' },
  { code: 'CAD', country: 'Canada', flag: '🇨🇦' },
  { code: 'CHF', country: 'Switzerland', flag: '🇨🇭' },
  { code: 'CNY', country: 'China', flag: '🇨🇳' },
  { code: 'SEK', country: 'Sweden', flag: '🇸🇪' },
  { code: 'NZD', country: 'New Zealand', flag: '🇳🇿' },
  { code: 'TRY', country: 'Turkey', flag: '🇹🇷' },
  { code: 'IRR', country: 'Iran', flag: '🇮🇷' },
  { code: 'AED', country: 'UAE', flag: '🇦🇪' },
  { code: 'SAR', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'KWD', country: 'Kuwait', flag: '🇰🇼' },
  { code: 'IQD', country: 'Iraq', flag: '🇮🇶' },
  { code: 'JOD', country: 'Jordan', flag: '🇯🇴' },
  { code: 'INR', country: 'India', flag: '🇮🇳' },
  { code: 'ZAR', country: 'South Africa', flag: '🇿🇦' },
  { code: 'BRL', country: 'Brazil', flag: '🇧🇷' },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setLoading(true);
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 6);

        const format = (d) => d.toISOString().split('T')[0];
        const start = format(startDate);
        const end = format(endDate);

        const response = await fetch(`https://api.exchangerate.host/timeseries?start_date=${start}&end_date=${end}&base=${fromCurrency}&symbols=${toCurrency}`);
        const data = await response.json();

        if (!data || !data.rates) throw new Error('Invalid response');

        const history = Object.entries(data.rates).map(([date, value]) => ({
          date,
          rate: value[toCurrency] || 1,
        }));

        setChartData(history);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError('API error');
        setLoading(false);
      }
    };
    fetchHistoricalData();
  }, [fromCurrency, toCurrency]);

  const convert = () => {
    if (!amount || isNaN(amount)) return setResult('Invalid amount');
    const latestRate = chartData[chartData.length - 1]?.rate || 1;
    const converted = parseFloat(amount) * latestRate;
    setResult(`${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`);
  };

  return (
    <motion.div 
      className="bg-gradient-to-r from-pink-200 to-blue-300 max-w-2xl w-full mx-auto mt-10 p-6 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center text-zinc-800 mb-6">
        🌍 Currency Converter
      </h2>

      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="w-full px-4 py-2 rounded-lg border border-zinc-300 text-black text bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 mb-4"
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <select
          value={fromCurrency}
          onChange={e => setFromCurrency(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-zinc-300  bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          {currencyData.map(({ code, country, flag }) => (
            <option key={code} value={code}>
              {flag} {code} - {country}
            </option>
          ))}
        </select>

        <select
          value={toCurrency}
          onChange={e => setToCurrency(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-zinc-300 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        > 
          {currencyData.map(({ code, country, flag }) => (
            <option key={code} value={code}>
              {flag} {code} - {country}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full mb-4">
        <button
          onClick={convert}
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600  w-full flex items-center justify-center gap-2 text-white py-2 px-4 rounded-lg font-medium transition hover:scale-102"
        >
          <ArrowRightLeft className="w-5 h-5" /> Convert
        </button>
      </div>

      {loading && <p className="text-center mt-4 text-sm text-zinc-500">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      {result && !loading && (
        <p className="mt-6 text-center text-lg font-semibold text-zinc-700 dark:text-zinc-200">
          {result}
        </p>
      )}

      {chartData.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-center text-zinc-700 dark:text-zinc-200 mb-4">
            7-Day Rate History
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" stroke="#888" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
