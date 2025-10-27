import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export type PaginationResponse<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
};

export type MemberFilter = {
  regionId?: string | null;
  districtId?: string | null;
  assemblyId?: string | null;
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  getRegions() {
    return this.http.get<PaginationResponse<any>>(`${environment.apiUrl}/regions`);
  }

  getMembers(filters: MemberFilter) {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });
    return this.http.get<PaginationResponse<any>>(`${environment.apiUrl}/members`, { params });
  }

  getMembershipStats() {
    return this.http.get<any>(`${environment.apiUrl}/statistics/membership`);
  }

  getRegionalStats() {
    return this.http.get<any[]>(`${environment.apiUrl}/statistics/regional`);
  }
}
