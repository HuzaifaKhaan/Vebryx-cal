"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";

// ─── EmailJS CONFIG ────────────────────────────────────────────────────────────

const EMAILJS_SERVICE_ID = "service_4l8svxo";
const EMAILJS_TEMPLATE_ID = "template_vofxya8";
const EMAILJS_PUBLIC_KEY = "Zkt6G1_4eN7p8yTvi";
// ──────────────────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 5;

type ProjectType = "full" | "mvp" | "update" | null;
type Platform = "web" | "mobile" | "both" | null;

interface Feature {
  id: string;
  name: string;
  baseCost: number;
  timeWeeks: number;
}

const features: Feature[] = [
  { id: "auth", name: "Authentication", baseCost: 800, timeWeeks: 1.5 },
  { id: "payments", name: "Payments", baseCost: 950, timeWeeks: 1.5 },
  { id: "notifications", name: "Notifications", baseCost: 600, timeWeeks: 1 },
  { id: "chat", name: "Real-time Chat", baseCost: 1400, timeWeeks: 2.5 },
  { id: "analytics", name: "Analytics", baseCost: 1100, timeWeeks: 2 },
  { id: "ai", name: "AI Features", baseCost: 2200, timeWeeks: 4 },
  { id: "admin", name: "Admin Panel", baseCost: 1200, timeWeeks: 2 },
  { id: "integrations", name: "API Integration", baseCost: 900, timeWeeks: 2 },
];

const timelines = [
  {
    id: "relaxed",
    name: "Relaxed",
    description: "2-3 months",
    multiplier: 0.6,
  },
  {
    id: "standard",
    name: "Standard",
    description: "1-2 months",
    multiplier: 0.7,
  },
  {
    id: "fast",
    name: "Fast Track",
    description: "2-4 weeks",
    multiplier: 0.9,
  },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const BoxIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);
const LightbulbIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);
const WrenchIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const GlobeIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);
const PhoneIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);
const DevicesIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="10" height="14" x="3" y="8" rx="2" />
    <path d="M5 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7" />
    <path d="M9 18h.01" />
  </svg>
);
const ClockIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const ArrowLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    color="white"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const featureIcons: Record<string, React.ReactNode> = {
  auth: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  payments: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
  notifications: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  chat: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  analytics: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" x2="18" y1="20" y2="10" />
      <line x1="12" x2="12" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="14" />
    </svg>
  ),
  ai: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  admin: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  integrations: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  ),
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export function MVPCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectType, setProjectType] = useState<ProjectType>(null);
  const [platform, setPlatform] = useState<Platform>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string | null>(null);

  // Step 5 sub-states
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return projectType !== null;
      case 2:
        return platform !== null;
      case 3:
        return selectedFeatures.length > 0;
      case 4:
        return timeline !== null;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS && canProceed())
      setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId],
    );
  };

  const resetCalculator = () => {
    setCurrentStep(1);
    setProjectType(null);
    setPlatform(null);
    setSelectedFeatures([]);
    setTimeline(null);

    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setFormSubmitted(false);
    setSending(false);
    setSendError("");
  };

  const calculateEstimate = () => {
    const platformMultiplier =
      platform === "both" ? 1.7 : platform === "mobile" ? 1.2 : 0.5;
    const projectMultiplier =
      projectType === "full" ? 1.5 : projectType === "update" ? 0.7 : 1;
    const timelineMultiplier =
      timelines.find((t) => t.id === timeline)?.multiplier || 1;
    const baseCost = selectedFeatures.reduce(
      (sum, fId) => sum + (features.find((f) => f.id === fId)?.baseCost || 0),
      0,
    );
    const baseTime = selectedFeatures.reduce(
      (sum, fId) => sum + (features.find((f) => f.id === fId)?.timeWeeks || 0),
      0,
    );
    
    const totalCost = Math.round(
      baseCost * platformMultiplier * projectMultiplier * timelineMultiplier,
    );
    const totalWeeks = Math.round(
      (baseTime * (platform === "both" ? 1.2 : 0.5)) / timelineMultiplier,
    );
    console.log(baseTime);
    return {
      cost: totalCost,
      minCost: Math.round(totalCost * 0.85),
      maxCost: Math.round(totalCost * 1.2),
      weeks: totalWeeks,
      minWeeks: Math.max(4, Math.round(totalWeeks * 0.8)),
      maxWeeks: Math.round(totalWeeks * 1.3),
    };
  };

  const estimate = calculateEstimate();

  // ── Send email via EmailJS ──────────────────────────────────────────────────
  const sendEmail = async () => {
    if (!userName.trim() || !userEmail.trim()) return;

    setSending(true);
    setSendError("");

    try {
      const emailjs = (await import("@emailjs/browser")).default;

      const selectedFeatureNames = selectedFeatures
        .map((id) => features.find((f) => f.id === id)?.name)
        .filter(Boolean)
        .join(", ");

      const templateParams = {
        from_name: userName,
        from_email: userEmail,
        project_type:
          projectType === "mvp"
            ? "MVP"
            : projectType === "full"
              ? "Full Product"
              : "Update Product",

        platform:
          platform === "both"
            ? "Web + Mobile"
            : platform === "web"
              ? "Web Application"
              : "Mobile App",

        features: selectedFeatureNames || "None",

        timeline: timelines.find((t) => t.id === timeline)?.name || timeline,

        estimated_cost: `£${estimate.cost.toLocaleString()} (Range: £${estimate.minCost.toLocaleString()} – £${estimate.maxCost.toLocaleString()})`,

        estimated_time: `${estimate.weeks} weeks (Range: ${estimate.minWeeks}–${estimate.maxWeeks} weeks)`,
      };

      console.log("Sending Email Params:", templateParams);

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      console.log("EmailJS Success:", response);

      setFormSubmitted(true);
    } catch (error) {
      console.log("EmailJS Error:", error);

      setSendError("Email failed to send. Please check EmailJS configuration.");
    } finally {
      setSending(false);
    }
  };

  const isFormValid =
    userName.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);

    

  return (
    <div className="w-full bg-[#E5ECFB] rounded-xl max-w-6xl mx-auto px-4 sm:px-0">
      <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
        {/* Progress Bar */}
        <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              />
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              Step {currentStep}/{TOTAL_STEPS}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 sm:px-8 pb-6 sm:pb-8">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg sm:text-2xl font-semibold text-foreground mb-1 sm:mb-2">
                    What would you like to do?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5 sm:mb-8">
                    Please choose one from the options below.
                  </p>
                </div>

                <Button
                  variant="ghost"
                  onClick={resetCalculator}
                  className="text-xs sm:text-sm h-8 px-3 cursor-pointer"
                >
                  Reset
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <SelectionCard
                  selected={projectType === "full"}
                  onClick={() => setProjectType("full")}
                  icon={<BoxIcon />}
                  iconBg="bg-indigo-50 text-indigo-500"
                  label="Build Full Product"
                />
                <SelectionCard
                  selected={projectType === "mvp"}
                  onClick={() => setProjectType("mvp")}
                  icon={<LightbulbIcon />}
                  iconBg="bg-emerald-50 text-emerald-500"
                  label="Start with MVP"
                />
                <SelectionCard
                  selected={projectType === "update"}
                  onClick={() => setProjectType("update")}
                  icon={<WrenchIcon />}
                  iconBg="bg-sky-50 text-sky-500"
                  label="Update Product"
                />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg sm:text-2xl font-semibold text-foreground mb-1 sm:mb-2">
                    Which platform do you need?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5 sm:mb-8">
                    Select your target platform.
                  </p>
                </div>

                <Button
                  variant="ghost"
                  onClick={resetCalculator}
                  className="text-xs sm:text-sm h-8 px-3 cursor-pointer"
                >
                  Reset
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <SelectionCard
                  selected={platform === "web"}
                  onClick={() => setPlatform("web")}
                  icon={<GlobeIcon />}
                  iconBg="bg-blue-50 text-blue-500"
                  label="Web Application"
                />
                <SelectionCard
                  selected={platform === "mobile"}
                  onClick={() => setPlatform("mobile")}
                  icon={<PhoneIcon />}
                  iconBg="bg-purple-50 text-purple-500"
                  label="Mobile App"
                />
                <SelectionCard
                  selected={platform === "both"}
                  onClick={() => setPlatform("both")}
                  icon={<DevicesIcon />}
                  iconBg="bg-teal-50 text-teal-500"
                  label="Web + Mobile"
                />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg sm:text-2xl font-semibold text-foreground mb-1 sm:mb-2">
                    What features do you need?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5 sm:mb-8">
                    Select all the features you want to include.
                  </p>
                </div>

                <Button
                  variant="ghost"
                  onClick={resetCalculator}
                  className="text-xs sm:text-sm h-8 px-3 cursor-pointer"
                >
                  Reset
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {features.map((feature) => (
                  <FeatureCard
                    key={feature.id}
                    selected={selectedFeatures.includes(feature.id)}
                    onClick={() => toggleFeature(feature.id)}
                    icon={featureIcons[feature.id]}
                    label={feature.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg sm:text-2xl font-semibold text-foreground mb-1 sm:mb-2">
                    What is your preferred timeline?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5 sm:mb-8">
                    Choose your development pace.
                  </p>
                </div>

                <Button
                  variant="ghost"
                  onClick={resetCalculator}
                  className="text-xs sm:text-sm h-8 px-3 cursor-pointer"
                >
                  Reset
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {timelines.map((t) => (
                  <SelectionCard
                    key={t.id}
                    selected={timeline === t.id}
                    onClick={() => setTimeline(t.id)}
                    icon={<ClockIcon />}
                    iconBg={
                      t.id === "relaxed"
                        ? "bg-green-50 text-green-500"
                        : t.id === "standard"
                          ? "bg-amber-50 text-amber-500"
                          : "bg-red-50 text-red-500"
                    }
                    label={t.name}
                    description={t.description}
                  />
                ))}
                
              </div>
            </div>
          )}

          {/* Step 5 */}
          {currentStep === 5 && (
            <div>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg sm:text-2xl font-semibold text-foreground mb-1 sm:mb-2">
                    Your Estimate is Ready
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5 sm:mb-8">
                    {formSubmitted
                      ? <span className="text-emerald-600 bg-emerald-50 p-2 rounded-xl">Here's your personalised and detailed project estimate.</span>
                      : "Enter your details to see your project estimate."}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  onClick={resetCalculator}
                  className="text-xs sm:text-sm h-8 px-3 cursor-pointer"
                >
                  Reset
                </Button>
              </div>

              {/* ── FORM (shown before submission) ── */}
              {!formSubmitted ? (
                <div className="space-y-4 mb-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <UserIcon /> Full Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Oliver Noh"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <MailIcon /> Email Address
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="e.g. oliver@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    />
                  </div>

                    <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <UserIcon /> Phone Number
                    </label>
                    <input
                      type="number"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="e.g. +44 7448 635310"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    />
                  </div>

                  {sendError && (
                    <p className="text-xs text-red-500 mt-1">{sendError}</p>
                  )}

                  <Button
                    onClick={sendEmail}
                    disabled={!isFormValid || sending}
                    className="w-full bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground gap-2 text-sm h-10"
                  >
                    {sending ? <span className="flex items-center gap-2"><Loader className="animate-spin"/>Calculating...</span> : "Calculate My Estimate"}
                    {!sending && <ArrowRightIcon />}
                  </Button>
                </div>
              ) : (
                /* ── ESTIMATE (shown after form submit) ── */
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-muted/50 rounded-xl p-4 sm:p-6">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                        Estimated Cost
                      </p>
                      <p className="text-2xl sm:text-4xl font-bold text-foreground mb-1">
                        £{estimate.cost.toLocaleString()}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Range: £{estimate.minCost.toLocaleString()} – £
                        {estimate.maxCost.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 sm:p-6">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                        Estimated Timeline
                      </p>
                      <p className="text-2xl sm:text-4xl font-bold text-foreground mb-1">
                        {estimate.weeks} weeks
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Range: {estimate.minWeeks} – {estimate.maxWeeks} weeks
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-4 sm:p-6 space-y-3">
                    <h3 className="font-medium text-foreground text-sm sm:text-base">
                      Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name</span>
                        <span className="font-medium">{userName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span className="font-medium truncate max-w-[120px]">
                          {userEmail}
                        </span>
                      </div>
                        <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone Number</span>
                        <span className="font-medium truncate max-w-[120px]">
                          {userPhone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Project Type
                        </span>
                        <span className="font-medium capitalize">
                          {projectType === "mvp"
                            ? "MVP"
                            : projectType?.replace("-", " ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform</span>
                        <span className="font-medium capitalize">
                          {platform === "both" ? "Web + Mobile" : platform}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Features</span>
                        <span className="font-medium">
                          {selectedFeatures.length} selected
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timeline</span>
                        <span className="font-medium capitalize">
                          {timeline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-8 py-4 sm:py-6 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 order-2 sm:order-1">
            <a
              href="https://calendly.com/vebryx-free-mvp-strategy-call/30min"
              className="text-primary text-xs sm:text-sm font-medium cursor-pointer hover:underline"
            >
              Consult Estimation Expert
            </a>
            <Badge className="bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-50 text-[10px] sm:text-xs px-1.5 sm:px-2">
              {"It's Free"}
            </Badge>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto order-1 sm:order-2">
            {currentStep > 1 && !formSubmitted && (
              <Button
                variant="ghost"
                onClick={prevStep}
                className="gap-1 sm:gap-2 cursor-pointer text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4"
              >
                <ArrowLeftIcon />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            {currentStep < TOTAL_STEPS && (
              <div className="flex gap-2">
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground gap-1 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10 px-4 sm:px-5 flex-1 sm:flex-none"
                >
                  Next Step
                  <ArrowRightIcon />
                </Button>
              </div>
            )}
            {currentStep === TOTAL_STEPS && formSubmitted && (
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => {
                    prevStep();
                    setFormSubmitted(false);
                  }}
                  className="gap-1 cursor-pointer hover:bg-blue-600/80 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4"
                >
                  <ArrowLeftIcon />
                  <span className="hidden sm:inline">Back</span>
                </Button>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
interface SelectionCardProps {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  description?: string;
}
function SelectionCard({
  selected,
  onClick,
  icon,
  iconBg,
  label,
  description,
}: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative p-4 sm:p-6  rounded-xl transition-all duration-200 text-center w-full cursor-pointer bg-muted/40 hover:bg-muted/60 ${selected ? "border border-primary shadow-sm" : "border border-transparent"}`}
    >
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full ${iconBg} flex items-center justify-center mb-3 sm:mb-4`}
      >
        {icon}
      </div>
      <p className="font-medium text-foreground text-sm sm:text-base">
        {label}
      </p>
      {description && (
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          {description}
        </p>
      )}
    </button>
  );
}

interface FeatureCardProps {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}
function FeatureCard({ selected, onClick, icon, label }: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative p-3
         sm:p-4 rounded-xl transition-all duration-200 text-center w-full cursor-pointer bg-muted/40 hover:bg-muted/60 ${selected ? "border border-primary bg-primary/5 shadow-sm" : "border border-transparent"}`}
    >
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 mx-auto rounded-full flex items-center justify-center mb-2 sm:mb-3 ${selected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
      >
        {icon}
      </div>
      <p className="text-xs sm:text-sm font-medium text-foreground leading-tight">
        {label}
      </p>
      {selected && (
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full flex items-center justify-center">
          <CheckIcon size={10} />
        </div>
      )}
    </button>
  );
}
