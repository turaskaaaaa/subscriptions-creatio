export interface Contact {
  id: number;
  fullName: string;
  type: string;
  account: string;
  mobilePhone: string;
  email: string;
  country: string;
  jobTitle: string;
  birthDate: string;
  subscriptions: { type: string; status: "Subscribed" | "Unsubscribed" }[];
}

export const contactsData: Contact[] = [
  { id: 9, fullName: "Aaron D'Souza", type: "Customer", account: "Computershare", mobilePhone: "+1 (415) 555-0101", email: "aaron.dsouza@computershare.com", country: "USA", jobTitle: "VP of Sales", birthDate: "3/15/1985", subscriptions: [{ type: "Information material", status: "Subscribed" }, { type: "Newsletter", status: "Subscribed" }] },
  { id: 10, fullName: "Aaron Falcone", type: "Partner", account: "LFG Financial", mobilePhone: "+1 (312) 555-0142", email: "aaron.falcone@lfg.com", country: "USA", jobTitle: "Director", birthDate: "7/22/1990", subscriptions: [{ type: "Information material", status: "Subscribed" }, { type: "Newsletter", status: "Unsubscribed" }] },
  { id: 11, fullName: "Aaron Friot", type: "Customer", account: "CBNA Corp", mobilePhone: "+1 (646) 555-0183", email: "aaron.friot@cbna.com", country: "Canada", jobTitle: "CTO", birthDate: "11/3/1988", subscriptions: [{ type: "Information material", status: "Unsubscribed" }, { type: "Newsletter", status: "Unsubscribed" }] },
  { id: 12, fullName: "Aaron G.", type: "Lead", account: "WeFloridaFinancial", mobilePhone: "+1 (305) 555-0124", email: "aaron@wefloridafinancial.com", country: "USA", jobTitle: "Manager", birthDate: "5/10/1992", subscriptions: [{ type: "Information material", status: "Subscribed" }, { type: "Newsletter", status: "Subscribed" }] },
  { id: 13, fullName: "Aaron Hibbard", type: "Customer", account: "Norgrum FCU", mobilePhone: "+1 (503) 555-0165", email: "aaronh@norgrumfcu.org", country: "USA", jobTitle: "Account Executive", birthDate: "1/28/1987", subscriptions: [{ type: "Information material", status: "Subscribed" }, { type: "Newsletter", status: "Subscribed" }] },
  { id: 14, fullName: "Aaron Hurt", type: "Partner", account: "Summit Credit Union", mobilePhone: "+1 (608) 555-0196", email: "aaron.hurt@summitcreditunion.com", country: "USA", jobTitle: "CEO", birthDate: "9/14/1983", subscriptions: [{ type: "Newsletter", status: "Subscribed" }] },
  { id: 15, fullName: "Aaron Irizarry", type: "Customer", account: "PNC Bank", mobilePhone: "+1 (412) 555-0137", email: "aaron.irizarry@pnc.com", country: "USA", jobTitle: "Product Manager", birthDate: "4/6/1991", subscriptions: [{ type: "Information material", status: "Subscribed" }, { type: "Newsletter", status: "Unsubscribed" }] },
  { id: 16, fullName: "Aaron Johnson", type: "Lead", account: "Tucson FCU", mobilePhone: "+1 (520) 555-0178", email: "aaron.johnson@tucsonfcu.com", country: "USA", jobTitle: "Analyst", birthDate: "12/19/1989", subscriptions: [{ type: "Information material", status: "Unsubscribed" }] },
  { id: 17, fullName: "Aaron Kaslow", type: "Customer", account: "Sandy Spring Bank", mobilePhone: "+1 (301) 555-0119", email: "akaslow@sandyspringbank.com", country: "USA", jobTitle: "CFO", birthDate: "8/2/1986", subscriptions: [{ type: "Information material", status: "Subscribed" }, { type: "Newsletter", status: "Subscribed" }] },
  { id: 18, fullName: "Aaron Lensink", type: "Partner", account: "Forte Bank WI", mobilePhone: "+1 (920) 555-0150", email: "alensink@fortebankwi.com", country: "USA", jobTitle: "Relationship Manager", birthDate: "6/25/1993", subscriptions: [{ type: "Newsletter", status: "Subscribed" }] },
  { id: 19, fullName: "Aaron Lucey", type: "Customer", account: "Summit State Bank", mobilePhone: "+1 (707) 555-0191", email: "alucey@summitstatebank.com", country: "USA", jobTitle: "Branch Manager", birthDate: "2/11/1984", subscriptions: [{ type: "Information material", status: "Subscribed" }, { type: "Newsletter", status: "Unsubscribed" }] },
  { id: 20, fullName: "Aaron Lynch", type: "Lead", account: "AUW Holdings", mobilePhone: "+44 7700 900132", email: "alynch@auw.com", country: "UK", jobTitle: "Operations Lead", birthDate: "10/30/1990", subscriptions: [{ type: "Information material", status: "Unsubscribed" }, { type: "Newsletter", status: "Unsubscribed" }] },
  { id: 21, fullName: "Aaron Malinowski", type: "Customer", account: "Amoco FCU", mobilePhone: "+1 (713) 555-0173", email: "amalinowski@amocofcu.org", country: "USA", jobTitle: "Senior Advisor", birthDate: "3/7/1987", subscriptions: [{ type: "Information material", status: "Subscribed" }, { type: "Newsletter", status: "Subscribed" }] },
  { id: 22, fullName: "Aaron Newman", type: "Partner", account: "Queensland Country", mobilePhone: "+61 4 1234 5678", email: "anewman@queenslandcountry.bank", country: "Australia", jobTitle: "Regional Director", birthDate: "7/18/1985", subscriptions: [{ type: "Information material", status: "Subscribed" }] },
  { id: 23, fullName: "Aaron Otter", type: "Customer", account: "Valley Bank", mobilePhone: "+1 (973) 555-0114", email: "aotter@valleybank.com", country: "USA", jobTitle: "VP Marketing", birthDate: "11/22/1991", subscriptions: [{ type: "Newsletter", status: "Subscribed" }] },
  { id: 24, fullName: "Aaron Perry", type: "Lead", account: "National Bank", mobilePhone: "+1 (202) 555-0155", email: "aperry@nationalbank.com", country: "USA", jobTitle: "Business Analyst", birthDate: "5/5/1988", subscriptions: [{ type: "Information material", status: "Subscribed" }, { type: "Newsletter", status: "Subscribed" }] },
  { id: 25, fullName: "Aaron Quinn", type: "Customer", account: "First Federal", mobilePhone: "+1 (843) 555-0196", email: "aquinn@firstfederal.com", country: "USA", jobTitle: "Loan Officer", birthDate: "9/29/1986", subscriptions: [{ type: "Information material", status: "Unsubscribed" }] },
  { id: 26, fullName: "Aaron Roberts", type: "Partner", account: "City Bank", mobilePhone: "+1 (214) 555-0137", email: "aroberts@citybank.com", country: "USA", jobTitle: "Partner Manager", birthDate: "1/13/1992", subscriptions: [{ type: "Information material", status: "Subscribed" }, { type: "Newsletter", status: "Subscribed" }] },
];
