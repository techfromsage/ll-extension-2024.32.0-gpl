/**
 * Interface general customization represents the general styling of an institute.
*/

interface GeneralCustomization {
  logo: string | null,
  floating_action_button: string | null,
  onboarding_text: string,
  survey_text: string,
  nps_text: string,
  tools_text: string,
  keyword_enhancement_text: string,
  additional_library_search_text: string,
  tools_description: string,
  services_text: string,
  services_description: string,
  primary_button_color: string,
  secondary_button_color: string,
}

export interface GeneralCustomizationResponse {
  general_customization: GeneralCustomization,
}

export default GeneralCustomization;
