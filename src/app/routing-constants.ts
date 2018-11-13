export const UrlComponents = {
  appPrefix: 'app',
  login: 'login',
  account: 'account',
  main: 'main',
  // Processes
  processPrefix: 'process',
  cases: 'cases',
  case: 'case',
  // Admin
  adminPrefix: 'admin',
  stress: 'stress',
  users: 'users',
  campaigns: 'campaigns',
  processes: 'processes',
  attributes: 'attributes',
  lovs: 'lovs',
  // Reports
  reportsPrefix: 'reports',
  overall_prod: 'overall_productiviy',
  collectors_prod: 'collectors_productiviy',
  campaigns_accomplishment: 'campaigns_accomplishment',
  calls_per_hour: 'calls_per_hour',
  incoming_calls: 'incoming_calls',
  contact_pctg: 'contact_pctg'
};

export const PublicUrls = {
  login: {url: `${UrlComponents.appPrefix}/${UrlComponents.login}`},
  account: {
    url: `${UrlComponents.appPrefix}/${UrlComponents.account}`,
    accountId: 'accountId',
    accountType: 'accountType',
    campaignRecord: 'campaignRecord'
  },
  main: {
    url: `${UrlComponents.appPrefix}/${UrlComponents.main}`,
    phoneNumber: 'phoneNumber'
  },
  process_cases: {url: `/${UrlComponents.processPrefix}/${UrlComponents.cases}`},
  process_case: {
    url: `/${UrlComponents.processPrefix}/${UrlComponents.case}`,
    caseId: 'caseId',
    accountType: 'accountType'
  },
  admin_stress: {url: `/${UrlComponents.adminPrefix}/${UrlComponents.stress}`},
  admin_users: {url: `/${UrlComponents.adminPrefix}/${UrlComponents.users}`},
  admin_campaigns: {url: `/${UrlComponents.adminPrefix}/${UrlComponents.campaigns}`},
  admin_processes: {url: `/${UrlComponents.adminPrefix}/${UrlComponents.processes}`},
  admin_attributes: {url: `/${UrlComponents.adminPrefix}/${UrlComponents.attributes}`},
  admin_lovs: {url: `/${UrlComponents.adminPrefix}/${UrlComponents.lovs}`},
  reports_overall_prod: {url: `/${UrlComponents.reportsPrefix}/${UrlComponents.overall_prod}`},
  reports_collectors_prod: {url: `/${UrlComponents.reportsPrefix}/${UrlComponents.collectors_prod}`},
  reports_campaigns_accomplishment: {url: `/${UrlComponents.reportsPrefix}/${UrlComponents.campaigns_accomplishment}`},
  reports_calls_per_hour: {url: `/${UrlComponents.reportsPrefix}/${UrlComponents.calls_per_hour}`},
  reports_incoming_calls: {url: `/${UrlComponents.reportsPrefix}/${UrlComponents.incoming_calls}`},
  reports_contact_pctg: {url: `/${UrlComponents.reportsPrefix}/${UrlComponents.contact_pctg}`}
};
