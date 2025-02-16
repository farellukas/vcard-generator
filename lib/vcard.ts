import vCardFactory from "vcards-js";

export type Data = Partial<{
  birthday: Date;
  anniversary: Date;
  cellPhone: string | string[];
  pagerPhone: string | string[];
  email: string | string[];
  workEmail: string | string[];
  otherEmail: string | string[];
  firstName: string;
  formattedName: string;
  gender: "M" | "F";
  homeAddress: Address;
  homePhone: string | string[];
  homeFax: string | string[];
  lastName: string;
  logo: Photo;
  middleName: string;
  namePrefix: string;
  nameSuffix: string;
  nickname: string;
  note: string;
  organization: string;
  isOrganization: boolean;
  photo: Photo;
  role: string;
  socialUrls: SocialUrls;
  source: string;
  title: string;
  url: string;
  workUrl: string;
  workAddress: Address;
  workPhone: string | string[];
  workFax: string | string[];
  otherPhone: string | string[];
  version: string;
}>;

interface SocialUrls {
  facebook: string;
  linkedIn: string;
  twitter: string;
  flickr: string;

  [custom: string]: string;
}

interface Photo {
  url: string;
  mediaType: string;
  base64: boolean;

  /**
   * Attach a photo from a URL
   * @param   url       URL where photo can be found
   * @param  mediaType Media type of photo (JPEG, PNG, GIF)
   */
  attachFromUrl: (url: string, mediaType: string) => void;

  /**
   * Embed a photo from a file using base-64 encoding (not implemented yet)
   * @param  fileLocation - filename
   */
  embedFromFile: (fileLocation: string) => void;

  /**
   * Embed a photo from a base-64 string
   * @param  base64String - the base64 string
   * @param  mediaType - the media type
   */
  embedFromString: (base64String: string, mediaType: string) => void;
}

interface Address {
  label: string;
  street: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  countryRegion: string;
}

export function createVCard(data: Data): string {
  const vcard = vCardFactory();

  if (data.birthday) vcard.birthday = data.birthday;
  if (data.anniversary) vcard.anniversary = data.anniversary;
  if (data.cellPhone) vcard.cellPhone = data.cellPhone;
  if (data.pagerPhone) vcard.pagerPhone = data.pagerPhone;
  if (data.email) vcard.email = data.email;
  if (data.workEmail) vcard.workEmail = data.workEmail;
  if (data.otherEmail) vcard.otherEmail = data.otherEmail;
  if (data.firstName) vcard.firstName = data.firstName;
  if (data.formattedName) vcard.formattedName = data.formattedName;
  if (data.workPhone) vcard.workPhone = data.workPhone;
  if (data.homePhone) vcard.homePhone = data.homePhone;
  if (data.homeFax) vcard.homeFax = data.homeFax;
  if (data.lastName) vcard.lastName = data.lastName;
  if (data.logo) vcard.logo = data.logo;
  if (data.middleName) vcard.middleName = data.middleName;
  if (data.namePrefix) vcard.namePrefix = data.namePrefix;
  if (data.nameSuffix) vcard.nameSuffix = data.nameSuffix;
  if (data.nickname) vcard.nickname = data.nickname;
  if (data.note) vcard.note = data.note;
  if (data.organization) vcard.organization = data.organization;
  if (data.isOrganization) vcard.isOrganization = data.isOrganization;
  if (data.photo) vcard.photo = data.photo;
  if (data.role) vcard.role = data.role;
  if (data.socialUrls) vcard.socialUrls = data.socialUrls;
  if (data.source) vcard.source = data.source;
  if (data.title) vcard.title = data.title;
  if (data.url) vcard.url = data.url;
  if (data.workUrl) vcard.workUrl = data.workUrl;
  if (data.homeAddress) vcard.homeAddress = data.homeAddress;
  if (data.workAddress) vcard.workAddress = data.workAddress;
  if (data.workFax) vcard.workFax = data.workFax;
  if (data.otherPhone) vcard.otherPhone = data.otherPhone;
  if (data.version) vcard.version = data.version;

  return vcard.getFormattedString();
}
