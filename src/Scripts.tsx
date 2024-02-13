import React from 'react';
import Script from 'next/script';

export interface NewRelicProps {
  accountId?: number;
  trustkKey?: string;
  licenseKey?: string;
  applicationId?: number;
}

const NewRelic: React.FC<NewRelicProps> = ({
  accountId,
  trustkKey,
  licenseKey,
  applicationId,
}: NewRelicProps): JSX.Element | null => {
  const accountIdFinal =
    accountId || process.env.NEXT_PUBLIC_NEW_RELIC_ACCOUNTID;
  const trustkKeyFinal =
    trustkKey || process.env.NEXT_PUBLIC_NEW_RELIC_TRUSTKEY;
  const licenseKeyFinal =
    licenseKey || process.env.NEXT_PUBLIC_NEW_RELIC_LICENSEKEY;
  const applicationIdFinal =
    applicationId || process.env.NEXT_PUBLIC_NEW_RELIC_APPLICATIONID;

  if (
    !accountIdFinal ||
    !trustkKeyFinal ||
    !licenseKeyFinal ||
    !applicationIdFinal
  ) {
    return null;
  }

  return (
    <>
      <Script
        id="nrjs-init-settings"
        type="text/javascript"
        strategy="beforeInteractive">
        {`
          ;window.NREUM||(NREUM={});NREUM.init={distributed_tracing:{enabled:true,cors_use_newrelic_header:true,cors_use_tracecontext_headers:true,allowed_origins:['https://jxp-example-trace-support.vercel.app']},privacy:{cookies_enabled:true}};

          NREUM.loader_config={
            accountID:"${accountIdFinal}", 
            trustKey:"${trustkKeyFinal}",
            agentID:"${applicationIdFinal}",
            licenseKey:"${licenseKeyFinal}",
            applicationID:"${applicationIdFinal}"
          };

          NREUM.info={
            beacon:"bam.nr-data.net",
            errorBeacon:"bam.nr-data.net",
            licenseKey:"${licenseKeyFinal}",
            applicationID:"${applicationIdFinal}",
            sa: 1
          };
          `}
      </Script>
      <Script
        id="nrjs-init"
        type="text/javascript"
        strategy="beforeInteractive"
        src='/scripts/new-relic-v1250.js'
      />
    </>
  );
};

const Scripts = (): JSX.Element | null => {
  return <NewRelic />;
};

export default Scripts;
