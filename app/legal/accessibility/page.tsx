export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-white text-[#071226]">
      <section className="bg-[#061733] px-7 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-wide text-[#0b6fff]">
            AttorneyAbogado.com
          </p>

          <h1 className="mt-4 text-5xl font-black">
            Accessibility Statement
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-7 py-14">
        <div className="space-y-8 text-base font-semibold leading-8 text-[#31415f]">
          <p>
            AttorneyAbogado.com is committed to providing a website that is
            accessible to all users, including individuals with disabilities.
          </p>

          <p>
            We continually work to improve the accessibility and usability of
            our website and strive to follow recognized accessibility best
            practices.
          </p>

          <p>
            If you experience difficulty accessing any part of this website or
            need assistance, please contact us and we will do our best to help.
          </p>

          <p>
            Email us at{" "}
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