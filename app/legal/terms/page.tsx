export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-[#071226]">
      <section className="bg-[#061733] px-7 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-wide text-[#0b6fff]">
            AttorneyAbogado.com
          </p>
          <h1 className="mt-4 text-5xl font-black">Terms of Service</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-7 py-14">
        <div className="space-y-8 text-base font-semibold leading-8 text-[#31415f]">
          <p>
            AttorneyAbogado.com is a platform that helps connect individuals
            with independent attorneys. We are not a law firm and do not provide
            legal advice or legal representation.
          </p>

          <p>
            Using this website does not create an attorney-client relationship
            with AttorneyAbogado.com or any attorney listed on the platform.
          </p>

          <p>
            Attorneys listed on AttorneyAbogado.com are independent
            professionals and are solely responsible for their own services,
            advice, communication, and representation.
          </p>

          <p>
            We do not guarantee attorney availability, qualifications,
            responsiveness, legal outcomes, or results.
          </p>

          <p>
            Users agree to provide accurate information and not misuse the
            website or submit false, harmful, or unlawful content.
          </p>

          <p>
            Attorneys featured on AttorneyAbogado.com may participate through
            paid marketing or exclusive territory agreements. This does not
            constitute an endorsement or guarantee of legal services.
          </p>

          <p>
            By using this website, you agree that AttorneyAbogado.com is not
            liable for disputes, losses, damages, or outcomes related to your
            use of the platform or your interactions with any attorney.
          </p>

          <p>
            Questions? Contact us at{" "}
            <a
              href="mailto:info@attorneyabogado.com"
              className="font-black text-[#006dff]"
            >
              info@attorneyabogado.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}