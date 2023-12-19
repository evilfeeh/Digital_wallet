export interface Idatabase {
  select: (table: string, params: any) => Promise<any>;
  insert: (table: string, params: any) => Promise<{ status: string, message: string }>;
  update: (table: string, params: any) => Promise<{ status: string, message: string }>;
  delete: (table: string, params: any) => Promise<{ status: string, message: string }>;
}
