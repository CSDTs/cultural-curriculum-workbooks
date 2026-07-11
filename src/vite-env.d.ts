/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ROOT_URL_DEV: string;
	readonly VITE_WORKBOOK_SAVE_API: string;
	readonly VITE_USERS_API: string;
	readonly VITE_CLASSROOMS_API: string;
	readonly VITE_LOCAL_ROOT: string;
	readonly VITE_PROD_ROOT: string;
	readonly VITE_LOCAL_DJANGO_ROOT: string;
	readonly VITE_WORKBOOKS_BASE: string;
	readonly VITE_CSNAP_BASE_URL: string;
	readonly VITE_JOESLUNCH_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare const config: any;
