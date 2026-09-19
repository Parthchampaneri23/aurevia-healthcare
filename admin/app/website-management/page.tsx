"use client";

import { useState, useEffect } from "react";
import {
  Home,
  FileText,
  PhoneCall,
  Briefcase,
  Save,
  RotateCcw,
  CheckCircle2,
  Plus,
  Trash2,
  Globe,
  Upload,
  Image as ImageIcon,
  Layers,
  Award,
  Sparkles,
  ShieldCheck,
  Target,
  HeartHandshake,
  HelpCircle,
} from "lucide-react";
import AdminShell from "@/components/AdminShell";
import {
  getWebsiteManagementData,
  saveWebsiteManagementData,
  initialWebsiteData,
  WebsiteManagementData,
  HeroSlide,
  CustomPageSection,
} from "@/app/lib/websiteManagementStorage";

const inputStyle =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 focus:outline-none transition";

export default function WebsiteManagementPage() {
  const [data, setData] = useState<WebsiteManagementData>(initialWebsiteData);
  const [activeTab, setActiveTab] = useState<"home" | "about" | "contact" | "career">("home");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setData(getWebsiteManagementData());
  }, []);

  const handleSave = () => {
    saveWebsiteManagementData(data);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset all website section contents back to default template data?")) {
      setData(initialWebsiteData);
      saveWebsiteManagementData(initialWebsiteData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }
  };

  // Image File Upload Helper
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (base64Url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onSuccess(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- HOME SLIDE ACTIONS ---
  const handleUpdateSlide = (index: number, field: keyof HeroSlide, value: string) => {
    const updated = [...data.homeData.heroSlides];
    updated[index] = { ...updated[index], [field]: value };
    setData({
      ...data,
      homeData: { ...data.homeData, heroSlides: updated },
    });
  };

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      eyebrow: "NEW HERO BANNER",
      title: "New Pharmaceutical Innovation & Facility",
      description: "Enter slide description to highlight products, facility standards or global partnerships.",
      image: "/hero/slide1.png",
      alt: "Aurevia banner slide",
      primaryButton: "Explore Products",
      primaryLink: "/products",
      secondaryButton: "Contact Us",
      secondaryLink: "/contact",
    };
    setData({
      ...data,
      homeData: {
        ...data.homeData,
        heroSlides: [...data.homeData.heroSlides, newSlide],
      },
    });
  };

  const handleDeleteSlide = (index: number) => {
    if (data.homeData.heroSlides.length <= 1) {
      alert("At least one banner slide is required for the hero slider.");
      return;
    }
    const updated = data.homeData.heroSlides.filter((_, i) => i !== index);
    setData({
      ...data,
      homeData: { ...data.homeData, heroSlides: updated },
    });
  };

  // --- DYNAMIC CUSTOM SECTION HELPERS ---
  const handleAddCustomSection = (tabKey: "homeData" | "aboutData" | "contactData" | "careerData") => {
    const newSec: CustomPageSection = {
      id: `sec-${Date.now()}`,
      sectionTitle: "New Custom Section",
      badgeTagline: "CUSTOM HIGHLIGHT",
      description: "Enter details and description for this newly added page section.",
      image: "/hero/slide1.png",
      buttonText: "Learn More",
      buttonLink: "/contact",
    };
    const currentList = data[tabKey].customSections || [];
    setData({
      ...data,
      [tabKey]: {
        ...data[tabKey],
        customSections: [...currentList, newSec],
      },
    });
  };

  const handleUpdateCustomSection = (
    tabKey: "homeData" | "aboutData" | "contactData" | "careerData",
    index: number,
    field: keyof CustomPageSection,
    value: string
  ) => {
    const currentList = [...(data[tabKey].customSections || [])];
    currentList[index] = { ...currentList[index], [field]: value };
    setData({
      ...data,
      [tabKey]: {
        ...data[tabKey],
        customSections: currentList,
      },
    });
  };

  const handleDeleteCustomSection = (
    tabKey: "homeData" | "aboutData" | "contactData" | "careerData",
    index: number
  ) => {
    const currentList = (data[tabKey].customSections || []).filter((_, i) => i !== index);
    setData({
      ...data,
      [tabKey]: {
        ...data[tabKey],
        customSections: currentList,
      },
    });
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* PAGE TOP HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 mb-2">
              <Globe size={13} className="text-teal-700" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                Website Section & Content Management
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Website Page & Section Manager
            </h1>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Manage Home Page, About Us, Contact, and Career pages with full section editing, image previews, and dynamic section creation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw size={14} />
              Reset Defaults
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700"
            >
              <Save size={15} />
              Save All Changes
            </button>
          </div>
        </div>

        {/* NOTIFICATION */}
        {saveSuccess && (
          <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 shadow-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <p className="text-xs font-bold sm:text-sm">
                Website content and page section updates saved successfully!
              </p>
            </div>
          </div>
        )}

        {/* 4 SUB CATEGORIES NAVIGATION TABS */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 border-b border-slate-200 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold transition-all ${
              activeTab === "home"
                ? "bg-[#123B5D] text-white shadow-md shadow-[#123B5D]/20 ring-2 ring-[#123B5D]/30"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Home size={16} />
            <span>Home Page</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("about")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold transition-all ${
              activeTab === "about"
                ? "bg-[#123B5D] text-white shadow-md shadow-[#123B5D]/20 ring-2 ring-[#123B5D]/30"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <FileText size={16} />
            <span>About Us</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contact")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold transition-all ${
              activeTab === "contact"
                ? "bg-[#123B5D] text-white shadow-md shadow-[#123B5D]/20 ring-2 ring-[#123B5D]/30"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <PhoneCall size={16} />
            <span>Contact</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("career")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold transition-all ${
              activeTab === "career"
                ? "bg-[#123B5D] text-white shadow-md shadow-[#123B5D]/20 ring-2 ring-[#123B5D]/30"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Briefcase size={16} />
            <span>Career</span>
          </button>
        </div>

        {/* ----------------------------------------------------
            TAB 1: HOME PAGE ALL SECTIONS
        ---------------------------------------------------- */}
        {activeTab === "home" && (
          <div className="space-y-8">
            {/* ANNOUNCEMENT HEADER BAR */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles size={14} /> Top Announcement Bar
                </span>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.showAnnouncementBar}
                    onChange={(e) =>
                      setData({ ...data, showAnnouncementBar: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  Show Banner on Website Header
                </label>
              </div>
              <input
                type="text"
                value={data.announcementBar}
                onChange={(e) => setData({ ...data, announcementBar: e.target.value })}
                className={inputStyle}
                placeholder="Top notification banner text..."
              />
            </div>

            {/* HOME SECTION 1: HERO SLIDER CAROUSEL */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl bg-slate-900 text-white p-6 shadow-md gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 text-teal-300 px-3 py-1 text-xs font-bold">
                    <Layers size={14} /> Home Section 1: Hero Carousel Slider
                  </div>
                  <h3 className="text-lg font-bold text-white mt-2">
                    Homepage Slider Banners & Images
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Manage top homepage slider banners with images, titles, descriptions, and call-to-action buttons.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddSlide}
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-bold text-white shadow transition hover:bg-teal-400 shrink-0"
                >
                  <Plus size={16} />
                  Add New Banner Slide
                </button>
              </div>

              {/* LIST OF SLIDES */}
              <div className="grid gap-6">
                {data.homeData.heroSlides.map((slide, index) => (
                  <div
                    key={slide.id || index}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                        Slide #{index + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleDeleteSlide(index)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                        Delete Slide
                      </button>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                      {/* IMAGE PREVIEW & UPLOADER */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-900">
                          Slide Image
                        </label>
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center">
                          {slide.image ? (
                            <img
                              src={slide.image}
                              alt={slide.alt || slide.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="text-center p-3 text-slate-400">
                              <ImageIcon size={24} className="mx-auto mb-1" />
                              <span className="text-[10px]">No image selected</span>
                            </div>
                          )}
                        </div>

                        <label className="cursor-pointer inline-flex items-center justify-center gap-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition">
                          <Upload size={14} />
                          Upload Slide Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (url) =>
                                handleUpdateSlide(index, "image", url)
                              )
                            }
                          />
                        </label>

                        <input
                          type="text"
                          value={slide.image}
                          onChange={(e) => handleUpdateSlide(index, "image", e.target.value)}
                          placeholder="Image path (/hero/slide1.png)"
                          className={inputStyle}
                        />
                      </div>

                      {/* SLIDE DETAILS */}
                      <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-bold text-slate-900">
                            Eyebrow / Badge Text
                          </label>
                          <input
                            type="text"
                            value={slide.eyebrow}
                            onChange={(e) =>
                              handleUpdateSlide(index, "eyebrow", e.target.value)
                            }
                            className={inputStyle}
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold text-slate-900">
                            Image Alt Text
                          </label>
                          <input
                            type="text"
                            value={slide.alt}
                            onChange={(e) => handleUpdateSlide(index, "alt", e.target.value)}
                            className={inputStyle}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-xs font-bold text-slate-900">
                            Headline Title
                          </label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => handleUpdateSlide(index, "title", e.target.value)}
                            className={inputStyle}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-xs font-bold text-slate-900">
                            Description Text
                          </label>
                          <textarea
                            rows={2}
                            value={slide.description}
                            onChange={(e) =>
                              handleUpdateSlide(index, "description", e.target.value)
                            }
                            className={inputStyle}
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold text-slate-900">
                            Primary Button Label
                          </label>
                          <input
                            type="text"
                            value={slide.primaryButton}
                            onChange={(e) =>
                              handleUpdateSlide(index, "primaryButton", e.target.value)
                            }
                            className={inputStyle}
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold text-slate-900">
                            Primary Link Target
                          </label>
                          <input
                            type="text"
                            value={slide.primaryLink}
                            onChange={(e) =>
                              handleUpdateSlide(index, "primaryLink", e.target.value)
                            }
                            className={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HOME SECTION 2: COMPANY INTRO */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full inline-block mb-1">
                  Home Section 2: Company Introduction
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Homepage Introductory Overview Section
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-900">
                    Intro Image
                  </label>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center">
                    {data.homeData.introImage ? (
                      <img
                        src={data.homeData.introImage}
                        alt="Intro section"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={24} className="text-slate-400" />
                    )}
                  </div>
                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">
                    <Upload size={14} />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setData({
                            ...data,
                            homeData: { ...data.homeData, introImage: url },
                          })
                        )
                      }
                    />
                  </label>
                  <input
                    type="text"
                    value={data.homeData.introImage}
                    onChange={(e) =>
                      setData({
                        ...data,
                        homeData: { ...data.homeData, introImage: e.target.value },
                      })
                    }
                    placeholder="Image path (/hero/slide1.png)"
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Intro Headline Title
                    </label>
                    <input
                      type="text"
                      value={data.homeData.introTitle}
                      onChange={(e) =>
                        setData({
                          ...data,
                          homeData: { ...data.homeData, introTitle: e.target.value },
                        })
                      }
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Intro Detailed Description
                    </label>
                    <textarea
                      rows={4}
                      value={data.homeData.introDescription}
                      onChange={(e) =>
                        setData({
                          ...data,
                          homeData: { ...data.homeData, introDescription: e.target.value },
                        })
                      }
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* HOME SECTION 3: THERAPEUTIC CATEGORIES */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full inline-block mb-1">
                  Home Section 3: Therapeutic Product Categories
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Homepage Product Portfolio Preview
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Categories Section Title
                  </label>
                  <input
                    type="text"
                    value={data.homeData.categoriesTitle}
                    onChange={(e) =>
                      setData({
                        ...data,
                        homeData: { ...data.homeData, categoriesTitle: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={data.homeData.categoriesSubtitle}
                    onChange={(e) =>
                      setData({
                        ...data,
                        homeData: { ...data.homeData, categoriesSubtitle: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                {data.homeData.categories.map((cat, idx) => (
                  <div
                    key={cat.id || idx}
                    className="flex gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50/60"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white relative">
                      <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={cat.name}
                        onChange={(e) => {
                          const updated = [...data.homeData.categories];
                          updated[idx].name = e.target.value;
                          setData({ ...data, homeData: { ...data.homeData, categories: updated } });
                        }}
                        className={inputStyle}
                        placeholder="Category Name"
                      />
                      <input
                        type="text"
                        value={cat.description}
                        onChange={(e) => {
                          const updated = [...data.homeData.categories];
                          updated[idx].description = e.target.value;
                          setData({ ...data, homeData: { ...data.homeData, categories: updated } });
                        }}
                        className={inputStyle}
                        placeholder="Description"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DYNAMIC CUSTOM SECTIONS LIST (FOR HOME PAGE) */}
            {data.homeData.customSections && data.homeData.customSections.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Additional Custom Home Sections
                </h4>
                {data.homeData.customSections.map((sec, idx) => (
                  <div
                    key={sec.id || idx}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold uppercase text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                        Custom Section #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomSection("homeData", idx)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Remove Section
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Badge Tagline
                        </label>
                        <input
                          type="text"
                          value={sec.badgeTagline}
                          onChange={(e) =>
                            handleUpdateCustomSection("homeData", idx, "badgeTagline", e.target.value)
                          }
                          className={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Section Title
                        </label>
                        <input
                          type="text"
                          value={sec.sectionTitle}
                          onChange={(e) =>
                            handleUpdateCustomSection("homeData", idx, "sectionTitle", e.target.value)
                          }
                          className={inputStyle}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Description Content
                        </label>
                        <textarea
                          rows={3}
                          value={sec.description}
                          onChange={(e) =>
                            handleUpdateCustomSection("homeData", idx, "description", e.target.value)
                          }
                          className={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ADD CUSTOM SECTION BUTTON FOR HOME */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleAddCustomSection("homeData")}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/50 px-5 py-3 text-xs font-bold text-teal-700 transition hover:bg-teal-100/60 w-full justify-center"
              >
                <Plus size={16} />
                Add New Custom Homepage Section
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 2: ABOUT US ALL SECTIONS
        ---------------------------------------------------- */}
        {activeTab === "about" && (
          <div className="space-y-8">
            {/* ABOUT SECTION 1: HERO HEADER */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full inline-block mb-1">
                  About Section 1: Hero Header
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  About Us Main Header Banner
                </h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Header Badge Tagline
                  </label>
                  <input
                    type="text"
                    value={data.aboutData.heroTagline}
                    onChange={(e) =>
                      setData({
                        ...data,
                        aboutData: { ...data.aboutData, heroTagline: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Hero Main Title
                  </label>
                  <input
                    type="text"
                    value={data.aboutData.heroTitle}
                    onChange={(e) =>
                      setData({
                        ...data,
                        aboutData: { ...data.aboutData, heroTitle: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Hero Subtitle Description
                  </label>
                  <textarea
                    rows={2}
                    value={data.aboutData.heroDescription}
                    onChange={(e) =>
                      setData({
                        ...data,
                        aboutData: { ...data.aboutData, heroDescription: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* ABOUT SECTION 2: COMPANY STORY & JOURNEY */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full inline-block mb-1">
                  About Section 2: Company Story & Facility Image
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Our Journey & Manufacturing Story
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {/* STORY IMAGE PREVIEW & UPLOAD */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-900">
                    Company Facility / Story Image
                  </label>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center">
                    {data.aboutData.storyImage ? (
                      <img
                        src={data.aboutData.storyImage}
                        alt="About Story"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={24} className="text-slate-400" />
                    )}
                  </div>
                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">
                    <Upload size={14} />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setData({
                            ...data,
                            aboutData: { ...data.aboutData, storyImage: url },
                          })
                        )
                      }
                    />
                  </label>
                  <input
                    type="text"
                    value={data.aboutData.storyImage}
                    onChange={(e) =>
                      setData({
                        ...data,
                        aboutData: { ...data.aboutData, storyImage: e.target.value },
                      })
                    }
                    placeholder="Image path (/hero/About-us.png)"
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Story Title
                    </label>
                    <input
                      type="text"
                      value={data.aboutData.storyTitle}
                      onChange={(e) =>
                        setData({
                          ...data,
                          aboutData: { ...data.aboutData, storyTitle: e.target.value },
                        })
                      }
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Story Paragraph 1
                    </label>
                    <textarea
                      rows={3}
                      value={data.aboutData.storyParagraph1}
                      onChange={(e) =>
                        setData({
                          ...data,
                          aboutData: { ...data.aboutData, storyParagraph1: e.target.value },
                        })
                      }
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Story Paragraph 2
                    </label>
                    <textarea
                      rows={3}
                      value={data.aboutData.storyParagraph2}
                      onChange={(e) =>
                        setData({
                          ...data,
                          aboutData: { ...data.aboutData, storyParagraph2: e.target.value },
                        })
                      }
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ABOUT SECTION 3: MISSION & VISION */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full inline-block mb-1">
                  About Section 3: Mission & Vision Statements
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Mission & Vision Commitments
                </h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Mission Statement
                  </label>
                  <textarea
                    rows={4}
                    value={data.aboutData.missionText}
                    onChange={(e) =>
                      setData({
                        ...data,
                        aboutData: { ...data.aboutData, missionText: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Vision Statement
                  </label>
                  <textarea
                    rows={4}
                    value={data.aboutData.visionText}
                    onChange={(e) =>
                      setData({
                        ...data,
                        aboutData: { ...data.aboutData, visionText: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* DYNAMIC CUSTOM SECTIONS LIST (FOR ABOUT US) */}
            {data.aboutData.customSections && data.aboutData.customSections.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Additional Custom About Sections
                </h4>
                {data.aboutData.customSections.map((sec, idx) => (
                  <div
                    key={sec.id || idx}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold uppercase text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                        Custom Section #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomSection("aboutData", idx)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Remove Section
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Badge Tagline
                        </label>
                        <input
                          type="text"
                          value={sec.badgeTagline}
                          onChange={(e) =>
                            handleUpdateCustomSection("aboutData", idx, "badgeTagline", e.target.value)
                          }
                          className={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Section Title
                        </label>
                        <input
                          type="text"
                          value={sec.sectionTitle}
                          onChange={(e) =>
                            handleUpdateCustomSection("aboutData", idx, "sectionTitle", e.target.value)
                          }
                          className={inputStyle}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Description Content
                        </label>
                        <textarea
                          rows={3}
                          value={sec.description}
                          onChange={(e) =>
                            handleUpdateCustomSection("aboutData", idx, "description", e.target.value)
                          }
                          className={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ADD CUSTOM SECTION BUTTON FOR ABOUT US */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleAddCustomSection("aboutData")}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/50 px-5 py-3 text-xs font-bold text-teal-700 transition hover:bg-teal-100/60 w-full justify-center"
              >
                <Plus size={16} />
                Add New Custom About Us Section
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 3: CONTACT PAGE ALL SECTIONS
        ---------------------------------------------------- */}
        {activeTab === "contact" && (
          <div className="space-y-8">
            {/* CONTACT SECTION 1: HEADER & BANNER */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full inline-block mb-1">
                  Contact Section 1: Hero Header & Banner Image
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Contact Page Banner Header
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-900">
                    Contact Banner Image
                  </label>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center">
                    {data.contactData.bannerImage ? (
                      <img
                        src={data.contactData.bannerImage}
                        alt="Contact banner"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={24} className="text-slate-400" />
                    )}
                  </div>
                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">
                    <Upload size={14} />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setData({
                            ...data,
                            contactData: { ...data.contactData, bannerImage: url },
                          })
                        )
                      }
                    />
                  </label>
                  <input
                    type="text"
                    value={data.contactData.bannerImage}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactData: { ...data.contactData, bannerImage: e.target.value },
                      })
                    }
                    placeholder="Image path (/hero/slide4.png)"
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Contact Tagline
                    </label>
                    <input
                      type="text"
                      value={data.contactData.heroTagline}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contactData: { ...data.contactData, heroTagline: e.target.value },
                        })
                      }
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Contact Title
                    </label>
                    <input
                      type="text"
                      value={data.contactData.heroTitle}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contactData: { ...data.contactData, heroTitle: e.target.value },
                        })
                      }
                      className={inputStyle}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Hero Subtitle Description
                    </label>
                    <textarea
                      rows={2}
                      value={data.contactData.heroDescription}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contactData: { ...data.contactData, heroDescription: e.target.value },
                        })
                      }
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT SECTION 2: CONTACT DETAILS & ADDRESS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full inline-block mb-1">
                  Contact Section 2: Communication & Office Info
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Headquarters & Communication Info
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Official Email Address
                  </label>
                  <input
                    type="text"
                    value={data.contactData.email}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactData: { ...data.contactData, email: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Official Phone Number
                  </label>
                  <input
                    type="text"
                    value={data.contactData.phone}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactData: { ...data.contactData, phone: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Operating Working Hours
                  </label>
                  <input
                    type="text"
                    value={data.contactData.workingHours}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactData: { ...data.contactData, workingHours: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Factory & Office Address
                  </label>
                  <textarea
                    rows={2}
                    value={data.contactData.officeAddress}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactData: { ...data.contactData, officeAddress: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* DYNAMIC CUSTOM SECTIONS LIST (FOR CONTACT) */}
            {data.contactData.customSections && data.contactData.customSections.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Additional Custom Contact Sections
                </h4>
                {data.contactData.customSections.map((sec, idx) => (
                  <div
                    key={sec.id || idx}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold uppercase text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                        Custom Section #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomSection("contactData", idx)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Remove Section
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Badge Tagline
                        </label>
                        <input
                          type="text"
                          value={sec.badgeTagline}
                          onChange={(e) =>
                            handleUpdateCustomSection("contactData", idx, "badgeTagline", e.target.value)
                          }
                          className={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Section Title
                        </label>
                        <input
                          type="text"
                          value={sec.sectionTitle}
                          onChange={(e) =>
                            handleUpdateCustomSection("contactData", idx, "sectionTitle", e.target.value)
                          }
                          className={inputStyle}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Description Content
                        </label>
                        <textarea
                          rows={3}
                          value={sec.description}
                          onChange={(e) =>
                            handleUpdateCustomSection("contactData", idx, "description", e.target.value)
                          }
                          className={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ADD CUSTOM SECTION BUTTON FOR CONTACT */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleAddCustomSection("contactData")}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/50 px-5 py-3 text-xs font-bold text-teal-700 transition hover:bg-teal-100/60 w-full justify-center"
              >
                <Plus size={16} />
                Add New Custom Contact Section
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 4: CAREER PAGE ALL SECTIONS
        ---------------------------------------------------- */}
        {activeTab === "career" && (
          <div className="space-y-8">
            {/* CAREER SECTION 1: HEADER & BANNER */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full inline-block mb-1">
                  Career Section 1: Hero Header & Banner Image
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Careers Page Banner Header
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-900">
                    Career Banner Image
                  </label>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center">
                    {data.careerData.bannerImage ? (
                      <img
                        src={data.careerData.bannerImage}
                        alt="Career banner"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={24} className="text-slate-400" />
                    )}
                  </div>
                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">
                    <Upload size={14} />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setData({
                            ...data,
                            careerData: { ...data.careerData, bannerImage: url },
                          })
                        )
                      }
                    />
                  </label>
                  <input
                    type="text"
                    value={data.careerData.bannerImage}
                    onChange={(e) =>
                      setData({
                        ...data,
                        careerData: { ...data.careerData, bannerImage: e.target.value },
                      })
                    }
                    placeholder="Image path (/hero/slide1.png)"
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Career Tagline
                      </label>
                      <input
                        type="text"
                        value={data.careerData.heroTagline}
                        onChange={(e) =>
                          setData({
                            ...data,
                            careerData: { ...data.careerData, heroTagline: e.target.value },
                          })
                        }
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        HR Applications Email
                      </label>
                      <input
                        type="text"
                        value={data.careerData.hrEmail}
                        onChange={(e) =>
                          setData({
                            ...data,
                            careerData: { ...data.careerData, hrEmail: e.target.value },
                          })
                        }
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Career Hero Title
                    </label>
                    <input
                      type="text"
                      value={data.careerData.heroTitle}
                      onChange={(e) =>
                        setData({
                          ...data,
                          careerData: { ...data.careerData, heroTitle: e.target.value },
                        })
                      }
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Hero Description
                    </label>
                    <textarea
                      rows={2}
                      value={data.careerData.heroDescription}
                      onChange={(e) =>
                        setData({
                          ...data,
                          careerData: { ...data.careerData, heroDescription: e.target.value },
                        })
                      }
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CAREER SECTION 2: WHY WORK WITH US */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full inline-block mb-1">
                  Career Section 2: Culture & Work Environment
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Why Work With Aurevia Healthcare
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Why Work Title
                  </label>
                  <input
                    type="text"
                    value={data.careerData.whyWorkTitle}
                    onChange={(e) =>
                      setData({
                        ...data,
                        careerData: { ...data.careerData, whyWorkTitle: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-900">
                    Culture & Opportunities Description
                  </label>
                  <textarea
                    rows={3}
                    value={data.careerData.whyWorkDescription}
                    onChange={(e) =>
                      setData({
                        ...data,
                        careerData: { ...data.careerData, whyWorkDescription: e.target.value },
                      })
                    }
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* DYNAMIC CUSTOM SECTIONS LIST (FOR CAREER) */}
            {data.careerData.customSections && data.careerData.customSections.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Additional Custom Career Sections
                </h4>
                {data.careerData.customSections.map((sec, idx) => (
                  <div
                    key={sec.id || idx}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold uppercase text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                        Custom Section #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomSection("careerData", idx)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Remove Section
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Badge Tagline
                        </label>
                        <input
                          type="text"
                          value={sec.badgeTagline}
                          onChange={(e) =>
                            handleUpdateCustomSection("careerData", idx, "badgeTagline", e.target.value)
                          }
                          className={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Section Title
                        </label>
                        <input
                          type="text"
                          value={sec.sectionTitle}
                          onChange={(e) =>
                            handleUpdateCustomSection("careerData", idx, "sectionTitle", e.target.value)
                          }
                          className={inputStyle}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-900 mb-1">
                          Description Content
                        </label>
                        <textarea
                          rows={3}
                          value={sec.description}
                          onChange={(e) =>
                            handleUpdateCustomSection("careerData", idx, "description", e.target.value)
                          }
                          className={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ADD CUSTOM SECTION BUTTON FOR CAREER */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleAddCustomSection("careerData")}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/50 px-5 py-3 text-xs font-bold text-teal-700 transition hover:bg-teal-100/60 w-full justify-center"
              >
                <Plus size={16} />
                Add New Custom Career Section
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
