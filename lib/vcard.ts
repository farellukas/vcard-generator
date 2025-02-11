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

  if (data.firstName) {
    vcard.firstName = data.firstName;
  }
  if (data.middleName) {
    vcard.middleName = data.middleName;
  }
  if (data.lastName) {
    vcard.lastName = data.lastName;
  }
  if (data.workPhone) {
    vcard.workPhone = data.workPhone;
  }
  if (data.email) {
    vcard.email = data.email;
  }
  if (data.organization) {
    vcard.organization = data.organization;
  }
  if (data.url) {
    vcard.url = data.url;
  }
  if (data.note) {
    vcard.note = data.note;
  }

  return vcard.getFormattedString();
}
