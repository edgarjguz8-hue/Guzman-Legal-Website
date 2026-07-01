"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const practiceAreaKeys = [
  "practice.carAccidents",
  "practice.criminalDefense",
  "practice.familyLaw",
  "practice.immigration",
  "practice.employmentLaw",
  "practice.businessLaw",
  "practice.estatePlanning",
  "practice.realEstate",
]

export function GetConnectedForm() {
  const { t } = useLanguage()

  const [zipCode, setZipCode] = useState("")
  const [selectedAreaKey, setSelectedAreaKey] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notAvailableMessage, setNotAvailableMessage] = useState("")
  const router = useRouter()

  const selectedAreaText = selectedAreaKey ? t(selectedAreaKey) : ""

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setNotAvailableMessage("")

    if (!zipCode || !selectedAreaKey) {
      setLoading(false)
      return
    }

    const practiceAreaForDatabase = t(selectedAreaKey)

    try {
      const response = await fetch("/api/find-attorney", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zipCode,
          practiceArea: practiceAreaForDatabase,
        }),
      })

      const data = await response.json()

      if (data.attorneyId) {
        const params = new URLSearchParams({
          attorneyId: data.attorneyId,
          firmName: data.firmName,
          attorneyName: data.attorneyName,
          area: practiceAreaForDatabase,
          county: data.county,
          phone: data.phone,
          email: data.email,
          zip: zipCode,
          ...(data.website && { website: data.website }),
          ...(data.bio && { bio: data.bio }),
        })

        router.push(`/matched-attorney?${params.toString()}`)
      } else {
        setNotAvailableMessage(t("hero.notAvailable"))
      }
    } catch (error) {
      console.error("[v0] Search error:", error)
      setNotAvailableMessage(t("form.errorGeneric"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="mt-10">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm font-black">
            {t("form.zipCode")}
          </label>

          <input
            type="text"
            placeholder={t("form.zipPlaceholder")}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            maxLength={5}
            className="mt-2 h-14 w-full rounded-lg border border-slate-200 px-5 outline-none focus:border-[#0b5fc4]"
          />
        </div>

        <div>
          <label className="text-sm font-black">
            {t("form.legalIssue")}
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="mt-2 flex h-14 w-full items-center justify-between rounded-lg border border-slate-200 px-5 text-left text-slate-600 outline-none focus:border-[#0b5fc4]"
            >
              {selectedAreaText || t("form.selectLegalIssue")}
              <ChevronDown className="h-5 w-5 text-[#071226]" />
            </button>

            {showDropdown && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-slate-200 bg-white shadow-lg">
                {practiceAreaKeys.map((areaKey) => (
                  <button
                    key={areaKey}
                    type="button"
                    onClick={() => {
                      setSelectedAreaKey(areaKey)
                      setShowDropdown(false)
                    }}
                    className="block w-full px-5 py-3 text-left text-slate-600 hover:bg-slate-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {t(areaKey)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !zipCode || !selectedAreaKey}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg bg-[#061a38] px-6 py-4 text-lg font-black text-white shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? t("form.searching") : t("hero.findButton")}
        {!loading && <ArrowRight className="h-5 w-5" />}
      </button>

      {notAvailableMessage && (
        <div className="mt-4 rounded-lg bg-amber-50 p-4 text-center text-amber-800">
          {notAvailableMessage}
        </div>
      )}
    </form>
  )
}