export const API_END_POINT={
    allLanguage:"/api/language/all",
    getAllData:"/api/screen-content",
    sideMenu:"/user/side-menu",
    getFilterWord:"filter/get-filter-words",
    addFilterWord:"/filter/keywords/ADD",
    deleteFilterWord:"/filter/keywords/DELETE",
    refreshToken:"/api/refresh-token",
    privacyContent:"/api/privacy-content",
    subscriptionPlans:"/api/individual-subscription-plans?planType=SUBSCRIPTION",
    getTemplates:"/signature/get-templates",
    getFAQ:"/individual/get-faqs",
    sendOTP:"/otp/manage-Otp/SEND_OTP",
    resendOTP:"/otp/manage-Otp/RESEND_OTP",
    validateOTP:"/otp/validate-Otp",
    getInfo:"/signature/get-info",
    unsubscribe:"/billing/unsubscription",
    subscribe:"/billing/subscription",
    mediaContent:"/api/media-content?isIndividualSpecific=true",
    updateSignature:"/signature/upsert",
    checkSubApi:"/billing/checkSub?msisdn=",
    profileUrl:"/user/profile",
    regexUrl:"/api/regex",
    publishUrl:"/dashboard/signature-action/PUBLISH",
    unPublishUrl:"/dashboard/signature-action/UNPUBLISH",
    headerEnrichmentCheckAPI:"http://172.16.11.222:8099/header-augment-0.0.1-SNAPSHOT/v1/mobile/get-he-number"
}