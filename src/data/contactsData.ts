export interface Contact {
  id: number;
  fullName: string;
  type: string;
  account: string;
  mobilePhone: string;
  email: string;
  country: string;
}

export const contactsData: Contact[] = [
  { id: 9, fullName: "Aaron D'Souza", type: "Customer", account: "Computershare", mobilePhone: "+1 (415) 555-0101", email: "aaron.dsouza@computershare.com", country: "USA" },
  { id: 10, fullName: "Aaron Falcone", type: "Partner", account: "LFG Financial", mobilePhone: "+1 (312) 555-0142", email: "aaron.falcone@lfg.com", country: "USA" },
  { id: 11, fullName: "Aaron Friot", type: "Customer", account: "CBNA Corp", mobilePhone: "+1 (646) 555-0183", email: "aaron.friot@cbna.com", country: "Canada" },
  { id: 12, fullName: "Aaron G.", type: "Lead", account: "WeFloridaFinancial", mobilePhone: "+1 (305) 555-0124", email: "aaron@wefloridafinancial.com", country: "USA" },
  { id: 13, fullName: "Aaron Hibbard", type: "Customer", account: "Norgrum FCU", mobilePhone: "+1 (503) 555-0165", email: "aaronh@norgrumfcu.org", country: "USA" },
  { id: 14, fullName: "Aaron Hurt", type: "Partner", account: "Summit Credit Union", mobilePhone: "+1 (608) 555-0196", email: "aaron.hurt@summitcreditunion.com", country: "USA" },
  { id: 15, fullName: "Aaron Irizarry", type: "Customer", account: "PNC Bank", mobilePhone: "+1 (412) 555-0137", email: "aaron.irizarry@pnc.com", country: "USA" },
  { id: 16, fullName: "Aaron Johnson", type: "Lead", account: "Tucson FCU", mobilePhone: "+1 (520) 555-0178", email: "aaron.johnson@tucsonfcu.com", country: "USA" },
  { id: 17, fullName: "Aaron Kaslow", type: "Customer", account: "Sandy Spring Bank", mobilePhone: "+1 (301) 555-0119", email: "akaslow@sandyspringbank.com", country: "USA" },
  { id: 18, fullName: "Aaron Lensink", type: "Partner", account: "Forte Bank WI", mobilePhone: "+1 (920) 555-0150", email: "alensink@fortebankwi.com", country: "USA" },
  { id: 19, fullName: "Aaron Lucey", type: "Customer", account: "Summit State Bank", mobilePhone: "+1 (707) 555-0191", email: "alucey@summitstatebank.com", country: "USA" },
  { id: 20, fullName: "Aaron Lynch", type: "Lead", account: "AUW Holdings", mobilePhone: "+44 7700 900132", email: "alynch@auw.com", country: "UK" },
  { id: 21, fullName: "Aaron Malinowski", type: "Customer", account: "Amoco FCU", mobilePhone: "+1 (713) 555-0173", email: "amalinowski@amocofcu.org", country: "USA" },
  { id: 22, fullName: "Aaron Newman", type: "Partner", account: "Queensland Country", mobilePhone: "+61 4 1234 5678", email: "anewman@queenslandcountry.bank", country: "Australia" },
  { id: 23, fullName: "Aaron Otter", type: "Customer", account: "Valley Bank", mobilePhone: "+1 (973) 555-0114", email: "aotter@valleybank.com", country: "USA" },
  { id: 24, fullName: "Aaron Perry", type: "Lead", account: "National Bank", mobilePhone: "+1 (202) 555-0155", email: "aperry@nationalbank.com", country: "USA" },
  { id: 25, fullName: "Aaron Quinn", type: "Customer", account: "First Federal", mobilePhone: "+1 (843) 555-0196", email: "aquinn@firstfederal.com", country: "USA" },
  { id: 26, fullName: "Aaron Roberts", type: "Partner", account: "City Bank", mobilePhone: "+1 (214) 555-0137", email: "aroberts@citybank.com", country: "USA" },
];
