function AppPrivacy() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p>Last updated: Aug 7, 2024</p>
      <p>
        This Privacy Policy describes Our policies and procedures on the
        collection, use and disclosure of Your information when You use the
        Service and tells You about Your privacy rights and how the law protects
        You.
      </p>

      <h2>Definitions</h2>
      <p>For the purposes of this Privacy Policy:</p>
      <ul>
        <li>
          <p>
            <strong>Device</strong> means any device that can access the Service
            such as a computer, a cellphone or a digital tablet.
          </p>
        </li>
        <li>
          <p>
            <strong>Sokker Data</strong> is information such player, team,
            juniors, training, etc... data from your sokker account.
          </p>
        </li>
        <li>
          <p>
            <strong>Service</strong> refers to the application
          </p>
        </li>
        <li>
          <p>
            <strong>Service Provider</strong> It refers to sokker.org website
            API. It provides your sokker information.
          </p>
        </li>
        <li>
          <p>
            <strong>Website</strong> refers to https://sokker.org.
          </p>
        </li>
        <li>
          <p>
            <strong>You</strong> means the individual accessing or using the
            Service, or the company, or other legal entity on behalf of which
            such individual is accessing or using the Service, as applicable.
          </p>
        </li>
      </ul>
      <h1>Collecting and Using Your Personal Data</h1>
      <h2>Types of Data Collected(per-application)</h2>
      <h3>Sokker JSON data:</h3>
      <h4>Sokker Data: user, news, squad, team stats, juniors, and training data.</h4>
      <p>
        This app only accesses Sokker data upon user request, acting as an
        interface between sokker.org and your device. To retrieve the requested
        information, you must be logged in with your Sokker account. The app's
        sole function is to display your Sokker data. This information is not
        stored anywhere except on your device and is not sent to any external
        destination.
      </p>

      <p>
        We do not collect any other information but the one specified as
        collected data on our Service.
      </p>
      <p>Requests made:</p>
      <ul>
        <li>
          <strong>user:</strong>{" "}
          {"GET method => https://sokker.org/api/current"}
        </li>
        <li>
          <strong>news:</strong>{" "}
          {"GET method => https://sokker.org/api/news?filter[limit]=200"}
        </li>
        <li>
          <strong>news data:</strong>{" "}
          {"GET method => https://sokker.org/api/news/$newsId"}
        </li>
        <li>
          <strong>squad:</strong>
          {
            "GET method => https://sokker.org/api/player?filter[team]=${teamId}&filter[limit]=200&filter[offset]=0"
          }
        </li>
        <li>
          <strong>team stats:</strong>
          {
            "GET method => https://sokker.org/api/team/$teamId/stats"
          }
        </li>
        <li>
          <strong>juniors:</strong>{" "}
          {"GET method => https://sokker.org/api/junior"}
        </li>
        <li>
          <strong>juniors graph:</strong>{" "}
          {"GET method => https://sokker.org/api/junior/$juniorId/graph"}
        </li>
        <li>
          <strong>training/current-week:</strong>{" "}
          {"GET method => https://sokker.org/api/training"}
        </li>
        <li>
          <strong>training/summary:</strong>{" "}
          {"GET method => https://sokker.org/api/training/summary"}
        </li>
        <li>
          <strong>training/players history:</strong>{" "}
          {"GET method => https://sokker.org/api//training/${playerId}/report"}
        </li>
      </ul>
      <p>
        By using the Service, You agree to the collection and use of information
        in accordance with this Privacy Policy.
      </p>

      <h1>Changes to this Privacy Policy</h1>
      <p>
        We may update Our Privacy Policy from time to time. We will notify You
        of any changes by posting the new Privacy Policy on this page.
      </p>
      <p>
        You are advised to review this Privacy Policy periodically for any
        changes. Changes to this Privacy Policy are effective when they are
        posted on this page.
      </p>
      <h1>Contact Us</h1>
      <p>
        If you have any questions about this Privacy Policy, You can contact us:
      </p>
      <ul>
        <li>
          <p>By email: sokkercuba@gmail.com</p>
        </li>
        <li>
          <p>
            By visiting this page on our website:{" "}
            <a
              href="https://www.sokkercuba.com/contact"
              rel="external nofollow noopener"
              target="_blank"
            >
              https://www.sokkercuba.com/contact
            </a>
          </p>
        </li>
      </ul>
    </>
  );
}

export default AppPrivacy;
