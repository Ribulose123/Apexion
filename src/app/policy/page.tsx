import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="text-white min-h-screen w-full overflow-x-hidden px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-xl sm:max-w-7xl mx-auto py-12 w-"> {/* Increased max-width */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">
          Privacy Policy
        </h1>

        <div className="space-y-8">
          <section className="p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 pb-2">
              Who Are We (Owner And Data Controller)?
            </h2>
            <div className="space-y-4 text-[#7D8491] text-[15px]">
              <p>
                CotohMarkets Incorporated – First Floor, Meridian Place, Choc
                Estate, Castries, Saint Lucia.
              </p>
              <p>
                Contact Email:{" "}
                <a 
                  href="mailto:Support@CotohMarkets.Com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Support@CotohMarkets.Com
                </a>
              </p>
              <p>
                We Are Committed To Protecting Your Privacy And Maintaining The
                Security Of Any Personal Information That We Receive From You.
              </p>
            </div>
          </section>

          <section className="p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 pb-2">
              What Is The Purpose Of This Policy?
            </h2>
            <p className="text-[#7D8491] text-[15px] leading-relaxed">
              The purpose of this policy is to explain to you what personal
              information we collect and how we and our associated companies may
              use it. Companies are associated with us if they are our
              subsidiaries or we are both subsidiaries of the same corporate
              entity. <br /><br />
              We are the controller of any personal information that you provide
              to us, which means that we decide the purposes and means of the
              processing of that personal information.
            </p>
          </section>

          <section className="p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 pb-2">
              How Do We Obtain and Store Your Personal Information?
            </h2>
            <p className="text-[#7D8491] text-[15px] leading-relaxed">
              We obtain your personal information through applications, emails,
              letters, telephone calls, text messages, cookies, and conversations
              when you register in our services and work with them (including the
              personal information gained when you use our learning tools, demo
              accounts, and trading simulators). <br /><br />
              We may monitor or record phone calls with you and maintain a record of 
              all emails and electronic communications we send or receive. <br /><br />
              We follow strict security procedures in the storage and disclosure
              of the personal information that you have given to us to prevent
              unauthorized access.
            </p>
          </section>

          <section className="p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 pb-2">
              What Types Of Personal Information Do We Collect And Process?
            </h2>
            <p className="text-[#7D8491] text-[15px] leading-relaxed">
              Here is how the copier works: You, as an investor, simply select an
              expert or experts that you want to copy trades from. Once you are
              signed up, this is the only action needed on your part. <br /><br />
              Once you&apos;ve taken care of the above, you are all set. There are no 
              codes that you need to run or signals for you to manually input. 
              Our software will handle the trade copying automatically on your 
              behalf. We monitor your expert’s trading activity, and as soon as 
              there is a trade, we calculate all the necessary parameters and 
              execute the trade. <br /><br />
              The copier works based on trade percent amount. So, for example, 
              if your expert takes a position in XYZ coin for a total of 10% of 
              his account value and you are 100% allocated to that expert, then 
              the copier will also execute a trade in your account in the amount 
              of 10% of your account value.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
