 const BASE_URL = 'http://localhost:8080/o/api/';
 const USER_ACCOUNT_BASE_URL = `${BASE_URL}p/user-account/`;
 const USER_ID = 20139;
 const SITE_ID = 20126;
 const USER_NAME = 'test@liferay.com';
 const PASSWORD = 'test';
 const CONTENT_SITE_BASE_URL = `${BASE_URL}p/content-space/${SITE_ID}`;
 const WEBSITE_BASE_URL = `${BASE_URL}p/web-site/${SITE_ID}`;
 const CONTENT_SPACE_BASE_URL = `${BASE_URL}p/content-space/`;
 const STRUCTURED_CONTENTS_URL = `${CONTENT_SITE_BASE_URL}/structured-contents`;
module.exports = { 
        BASE_URL,
        USER_ACCOUNT_BASE_URL,
        USER_ID, 
        USER_NAME, 
        PASSWORD,  
        WEBSITE_BASE_URL, 
        CONTENT_SITE_BASE_URL,
        STRUCTURED_CONTENTS_URL,
        CONTENT_SPACE_BASE_URL };