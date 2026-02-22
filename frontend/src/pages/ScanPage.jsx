import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle,
  XCircle,
  Camera,
  FileText,
  ShieldCheck,
  AlertTriangle,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import VoiceQuery from "../components/VoiceQuery";
import { LANGUAGE_MAP } from "../utils/languageMap";

const STORAGE_KEY = "nutriguard_v2";

function ScanPage() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  // New State for Ingredient Analysis
  const [inputType, setInputType] = useState("image"); // "image" or "text"
  const [ingredientsText, setIngredientsText] = useState("");
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [conditions, setConditions] = useState([]); 
  const [followUpQuestion, setFollowUpQuestion] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setConditions(Array.isArray(saved) ? saved : []);
  }, []);

  const getConditionString = () => {
    return conditions.map(c => t(`conditions.${c}`)).join(", ");
  };

  const handleApiError = (err) => {
    let errorMessage = t("errors.analysisFailed");
    if (err.response?.status === 429) {
      errorMessage = "Too many requests. Please wait a moment and try again.";
    } else if (err.response?.data) {
      const backendError = err.response.data;
      errorMessage = typeof backendError === "string" ? backendError : (backendError.error || backendError.message || errorMessage);
    } else if (err.message) {
      errorMessage = err.message;
    }
    setError(errorMessage);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB");
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    setSelectedFile(file);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleScan = async () => {
    if (inputType === "image" && !selectedFile) return setError(t("errors.noImage"));
    if (inputType === "text" && !ingredientsText.trim()) return setError("Please enter ingredients to analyze.");
    if (conditions.length === 0) return setError(t("errors.noCondition")); 

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      if (inputType === "image") {
        formData.append("image", selectedFile);
      } else {
        formData.append("ingredientsText", ingredientsText);
      }
      
      formData.append("condition", getConditionString()); 
      formData.append("language", LANGUAGE_MAP[i18n.language] || "English");

      const res = await axios.post("https://nutb.onrender.com/analyze", formData);
      setResult(res.data);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceSubmit = async () => {
    if (!followUpQuestion || !result) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("https://nutb.onrender.com/analyze", {
        condition: getConditionString(),
        query: followUpQuestion,
        foodName: result.food_name
      });
      setResult(prev => ({ ...prev, ...res.data })); // Update with follow-up answer
      setFollowUpQuestion("");
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const TrafficIcon = {
    green: <CheckCircle className="w-8 h-8 text-green-400" />,
    yellow: <AlertCircle className="w-8 h-8 text-yellow-400" />,
    red: <XCircle className="w-8 h-8 text-red-400" />,
  };

  const TrafficTitle = {
    green: t('safety.safe'),
    yellow: t('safety.moderate'),
    red: t('safety.unsafe'),
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-5 relative">
      <div className="absolute inset-0 -z-10 pointer-events-none blur-3xl"></div>

      <motion.div
        className={`w-full max-w-[650px] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-12 transition-colors ${
          theme === 'dark' ? "bg-black/40" : "bg-white/90 border border-gray-200"
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.header className="text-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-2 ${
            theme === 'dark' ? "from-purple-500 to-blue-500" : "from-purple-600 to-blue-600"
          }`}>
            {t("scan.title")}
          </h1>
          <p className={`text-sm mb-4 ${theme === 'dark' ? "text-gray-300" : "text-gray-600"}`}>
            Identify harmful ingredients specifically for your health profile.
          </p>

          {/* Health Profile Badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {conditions.length > 0 ? (
              conditions.map(c => (
                <span key={c} className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                  theme === 'dark' ? "bg-blue-400/10 text-blue-300 border-blue-400/20" : "bg-blue-100 text-blue-700 border-blue-300"
                }`}>
                  {t(`conditions.${c}`)}
                </span>
              ))
            ) : (
              <Link to="/health-profile" className="text-xs text-yellow-500 underline">{t("scan.setCondition")}</Link>
            )}
          </div>
        </motion.header>

        {/* Input Type Tabs */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setInputType("image")}
            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
              inputType === "image" ? "bg-purple-600 text-white" : "bg-gray-500/10 text-gray-400"
            }`}
          >
            <Camera size={18} /> Image Scan
          </button>
          <button 
            onClick={() => setInputType("text")}
            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
              inputType === "text" ? "bg-purple-600 text-white" : "bg-gray-500/10 text-gray-400"
            }`}
          >
            <FileText size={18} /> Ingredient List
          </button>
        </div>

        <motion.div className="flex flex-col gap-6">
          {inputType === "image" ? (
            <div className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              theme === 'dark' ? "border-blue-500/30 bg-blue-500/5" : "border-blue-300 bg-blue-50"
            }`}>
              <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              {preview ? (
                <img src={preview} className="max-w-full max-h-[250px] rounded-2xl mx-auto" alt="Preview" />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-10 h-10 opacity-50" />
                  <p className="text-sm opacity-70">{t("scan.uploadHint")}</p>
                </div>
              )}
            </div>
          ) : (
            <textarea
              className={`w-full p-4 rounded-2xl border-2 transition-all outline-none min-h-[150px] ${
                theme === 'dark' ? "bg-white/5 border-purple-500/30 text-white" : "bg-gray-50 border-purple-200"
              }`}
              placeholder="Enter ingredients separated by commas (e.g. Sugar, Palm Oil, MSG...)"
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
            />
          )}

          <motion.button
            onClick={handleScan}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "Analyze Ingredients"}
          </motion.button>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div 
              className={`mt-8 p-6 rounded-3xl border ${theme === 'dark' ? "bg-blue-500/5 border-blue-400/10" : "bg-blue-50 border-blue-200"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                {TrafficIcon[result.traffic_light]}
                <h2 className="text-xl font-bold">{TrafficTitle[result.traffic_light]}</h2>
              </div>

              {/* Ingredient Classification Logic */}
              {result.ingredients_classification && (
                <div className="space-y-4 mb-6">
                  <h3 className="text-sm font-bold opacity-70 uppercase tracking-widest">Ingredient Breakdown</h3>
                  
                  {/* Harmful List */}
                  {result.ingredients_classification.harmful?.length > 0 && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                        <XCircle size={16} /> Harmful
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.ingredients_classification.harmful.map((ing, i) => (
                          <span key={i} className="px-3 py-1 bg-red-500/20 rounded-lg text-xs text-red-200">{ing.name}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Risky List */}
                  {result.ingredients_classification.risky?.length > 0 && (
                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                      <div className="flex items-center gap-2 text-yellow-400 font-bold mb-2">
                        <AlertTriangle size={16} /> Risky / Avoid
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.ingredients_classification.risky.map((ing, i) => (
                          <span key={i} className="px-3 py-1 bg-yellow-500/20 rounded-lg text-xs text-yellow-200">{ing.name}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Healthy List */}
                  {result.ingredients_classification.healthy?.length > 0 && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2 text-green-400 font-bold mb-2">
                        <ShieldCheck size={16} /> Healthy
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.ingredients_classification.healthy.map((ing, i) => (
                          <span key={i} className="px-3 py-1 bg-green-500/20 rounded-lg text-xs text-green-200">{ing.name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-4 text-sm opacity-90 border-t border-blue-400/10 pt-4">
                <p><strong>Verdict:</strong> {result.reason}</p>
                {result.suggestion && <p><strong>Recommendation:</strong> {result.suggestion}</p>}
              </div>

              {/* Follow-up Section */}
              <div className="mt-6 pt-6 border-t border-blue-400/10">
                <VoiceQuery onTranscriptChange={setFollowUpQuestion} />
                <button 
                  onClick={handleVoiceSubmit}
                  className="w-full mt-4 py-3 rounded-xl bg-purple-600 text-white font-bold disabled:opacity-50"
                  disabled={!followUpQuestion || loading}
                >
                  Ask AI About This Food
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ScanPage;
