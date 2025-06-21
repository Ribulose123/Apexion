export default function PrivacyPage(){
    return(
        <div className="mt-10 p-7">
             <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center  mb-6 backdrop-blur-sm ">
           
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text ">
            Privacy Policy
          </h1>
        </div>

        <div className="space-y-8">
          {/* Company Info */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Who Are We (Owner And Data Controller)?</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Octa Markets Incorporated — First Floor, Meridian Place, Choc Estate, Castries, Saint Lucia.
            </p>
            <div className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
              
              <a href="mailto:Support@Octabroker.Com" className="text-sm">
                Contact Email: Support@Octabroker.Com
              </a>
            </div>
            <p className="text-gray-300 mt-4 leading-relaxed">
              We Are Committed To Protecting Your Privacy And Maintaining The Security Of Any Personal Information That We Receive From You.
            </p>
          </section>

          

          {/* Purpose */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">What Is The Purpose Of This Policy?</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              The Purpose Of This Policy Is To Explain To You What Personal Information We Collect And How We And Our Associated 
              Companies May Use It, Companies Are Associated With Us If They Are Our Subsidiaries Or We Are Both Subsidiaries Of The 
              Same Corporate Entity.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We Are The Controller Of Any Personal Information That You Provide To Us, Which Means That We Decide The Purpose And 
              Means Of The Processing Of This Personal Information.
            </p>
          </section>

          <hr className="border-gray-700/50" />

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How Do We Obtain And Store Your Personal Information?</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              We Obtain Your Personal Information Through Applications, Emails, Letters, Telephone Calls, Text Messages, Cookies, And 
              Conversations When You Register In Our Services And Work With Them (Including The Personal Information Gained When You 
              Use Our Learning Tools, Demo Accounts, And Trading Simulators).
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              You May Know Some Secure Information About You And Neither You Nor We May Maintain A Record Of All Emails And Electronic 
              Communications We Send Or Receive.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We Follow Strict Security Procedures In The Storage And Disclosure Of The Personal Information That You Have Given To Us To 
              Prevent Unauthorised Access.
            </p>
          </section>

         

          {/* Types of Information */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">What Types Of Personal Information Do We Collect And Process?</h2>
            <p className="text-gray-300 leading-relaxed">
              Here Is How The Copier Works: You As An Investor, Simply Select An Expert Or Experts That You Want To Copy Trades From. 
              Once You Are Signed Up, This Is The Only Action Needed On Your Part.
            </p>
            <p className="text-gray-300 leading-relaxed">Once you’ve taken care of the above, you are all set. There are no codes that you need to run or signals for you to manually input. Our software will handle the trade copying automatically on your behalf. We monitor your experts trading activity and as soon as there is a trade, we calculate all the necessary parameters and execute the trade.</p>
            <p className="text-gray-300 leading-relaxed">The copier works based on trade percent amount. So, for example, if your expert takes a position in XYZ coin for a total of 10% of his account value and you are 100% allocated to that expert, then the copier will also execute a trade in your account in the amount of 10% of your account value.</p>
            <p className="text-gray-300 leading-relaxed">The only thing you have to make sure of is that you have enough available base currency that your expert trades with, in your trading account. How much is enough? First, you must meet the exchanges minimum order amount (let’s say about $10 per trade to be safe). That means that if your expert executes a 5% order, you must have at least $300 in your account total value (at 100% expert allocation as an example). This also means that you need to have at least 10% or higher in available base currency to avoid missed trades.</p>
            <p className="text-gray-300 leading-relaxed">When the expert exits a position, you too will exit it. Automatically. You can also change allocation at any time</p>
          </section>
        </div>

        </div>
    )
}