import { CheckCircle, ArrowRight } from 'lucide-react'
import { BackButton } from '@/components/back-button'

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="bg-[#082f63] px-7 pt-6 text-white">
        <div className="mx-auto max-w-[1400px]">
          <BackButton />
        </div>
      </section>
      <div className="px-7 py-20">
      <div className="mx-auto max-w-[600px] text-center">
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />

        <h1 className="mt-6 text-4xl font-black text-[#071226]">
          Your Connection Has Been Confirmed
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          The attorney has received your information and will reach out shortly.
        </p>

        <div className="mt-8 space-y-4 rounded-lg bg-white p-8 shadow-md">
          <h2 className="text-left text-sm font-black text-[#071226]">
            What happens next:
          </h2>

          <ol className="space-y-3 text-left">
            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b5fc4] text-sm font-black text-white">
                1
              </span>
              <span className="text-slate-600">
                An attorney will review your case
              </span>
            </li>

            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b5fc4] text-sm font-black text-white">
                2
              </span>
              <span className="text-slate-600">
                You&apos;ll be contacted at the phone number or email you provided
              </span>
            </li>

            <li className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b5fc4] text-sm font-black text-white">
                3
              </span>
              <span className="text-slate-600">
                Discuss your case and explore your legal options
              </span>
            </li>
          </ol>
        </div>

        <div className="mt-8 rounded-lg bg-amber-50 p-4 text-left">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Important:</strong> Submitting this form does not create an attorney-client relationship until confirmed by the attorney.
          </p>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Questions? We&apos;re here to help.
        </p>

        <a
          href="/"
          className="mt-6 inline-flex items-center gap-4 rounded-lg bg-[#061a38] px-8 py-4 font-black text-white shadow-xl"
        >
          Back to Home
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
      </div>
    </main>
  )
}
