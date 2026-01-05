import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const HEALTH_CONDITIONS = [
  "diabetes",
  "hypertension",
  "heart",
  "kidney",
  "cholesterol",
  "celiac",
  "lactose",
  "none",
];

const STORAGE_KEY = "nutriguard";

function Profile() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [condition, setCondition] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedCondition = localStorage.getItem(STORAGE_KEY);
    if (savedCondition) setCondition(savedCondition);
  }, []);

  useEffect(() => {
    if (condition) {
      localStorage.setItem(STORAGE_KEY, condition);      
      setSaved(true);
      const timer = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [condition]);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-4 sm:px-6">
      <motion.div
        className={`w-full max-w-[600px] rounded-3xl p-6 sm:p-8 md:p-12
 backdrop-blur-2xl border transition-colors ${
          theme === 'dark'
            ? "bg-black/40 border-blue-400/10 shadow-[0_0_140px_-30px_rgba(30,144,255,0.35)]"
            : "bg-white/90 border-blue-300/30 shadow-xl"
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <h1 className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent transition-colors ${
            theme === 'dark'
              ? "bg-gradient-to-r from-blue-300 to-cyan-400 drop-shadow-[0_0_15px_rgba(0,170,255,0.5)]"
              : "bg-gradient-to-r from-blue-600 to-cyan-600"
          }`}>
            {t("profile.title")}
          </h1>
          <p className={`text-sm mt-1 transition-colors ${
            theme === 'dark' ? "text-gray-400" : "text-gray-600"
          }`}>
            <p>{t("profile.subtitle")}</p>
          </p>
        </motion.header>

        <motion.div
          className="flex flex-col gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <motion.div
            className="flex flex-col gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <label className={`font-medium text-sm transition-colors ${
              theme === 'dark' ? "text-gray-300" : "text-gray-700"
            }`}>
              {t("profile.healthCondition")}

            </label>

            <motion.select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className={`w-full px-5 py-4 rounded-xl text-base backdrop-blur-xl transition-all duration-300 focus:outline-none cursor-pointer border ${
                theme === 'dark'
                  ? "bg-black/50 text-gray-200 border-gray-700 hover:border-blue-400/40"
                  : "bg-white text-gray-900 border-gray-300 hover:border-blue-400"
              }`}
              whileFocus={{ scale: 1.02 }}
            >
              <option value="">{t("profile.selectCondition")}</option>
              {HEALTH_CONDITIONS.map((cond) => (
                <option key={cond} value={cond} className="text-black">
                  {t(`conditions.${cond}`)}
                </option>
              ))}
            </motion.select>

            <AnimatePresence>
              {saved && condition && (
                <motion.p
                  className="text-green-400 text-xs font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {t("profile.saved")}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className={`p-6 rounded-xl backdrop-blur-xl border transition-colors ${
              theme === 'dark'
                ? "bg-gradient-to-br from-blue-700/20 to-cyan-600/20 border-blue-500/20 shadow-[0_0_50px_-15px_rgba(0,170,255,0.35)]"
                : "bg-blue-50 border-blue-200 shadow-md"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.03, x: 1 }}
          >
            <h3 className={`text-base font-semibold mb-2 transition-colors ${
              theme === 'dark' ? "text-blue-300" : "text-blue-700"
            }`}>
              {t("profile.whyTitle")}
            </h3>
            <p className={`text-sm leading-relaxed transition-colors ${
              theme === 'dark' ? "text-gray-300" : "text-gray-700"
            }`}>
              {t("profile.whyDesc")}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Profile;
