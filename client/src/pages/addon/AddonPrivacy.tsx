function AddonPrivacy() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p>Last updated: April 26, 2023</p>
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
            <strong>Cookies</strong> are small files that are placed on Your
            computer, mobile device or any other device by a website, containing
            the details of Your browsing history on that website among its many
            uses.
          </p>
        </li>
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
            <strong>Service</strong> refers to the extension
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
      <h2>Types of Data Collected(per-extension)</h2>
      <h3>Sokker JSON data exporter:</h3>
      <h4>Sokker Data: user, squad, juniors, and training data.</h4>
      <p>
        This extension only access sokker data per user request, exposing it by
        letting You to copy it to the clipboard. It uses sokker.org host
        permissions to retrieve requested information so you need to be logged
        in with your sokker account. There are no server-side activities. Such
        information is not saved in any place or sent to any destination, it is
        temporally cached and available to be copied to the clipboard by the
        user.
      </p>

      <p>
        We do not collect any other information but the one specified as
        downloadable data on our Service.
      </p>
      <p>Requests made:</p>
      <ul>
        <li>
          <strong>user:</strong>{' '}
          {'GET method => https://sokker.org/api/current'}
        </li>
        <li>
          <strong>squad:</strong>
          {
            'GET method => https://sokker.org/api//player?filter[team]=${teamId}&filter[limit]=200&filter[offset]=0'
          }
        </li>
        <li>
          <strong>juniors:</strong>{' '}
          {'GET method => https://sokker.org/api/junior'}
        </li>
        <li>
          <strong>training/current-week:</strong>{' '}
          {'GET method => https://sokker.org/api/training'}
        </li>
        <li>
          <strong>training/summary:</strong>{' '}
          {'GET method => https://sokker.org/api/training/summary'}
        </li>
        <li>
          <strong>training/players history:</strong>{' '}
          {'GET method => https://sokker.org/api//training/${playerId}/report'}
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
        We will let You know via email and/or a prominent notice on Our Service,
        prior to the change becoming effective and update the &quot;Last
        updated&quot; date at the top of this Privacy Policy.
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
            By visiting this page on our website:{' '}
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
  )
}

export default AddonPrivacy
