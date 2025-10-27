import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

export type MemberFilter = {
  assemblyId?: string | null;
  districtId?: string | null;
  regionId?: string | null;
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  getMembers(filters: MemberFilter) {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    });
    return this.http.get<any>(`${environment.apiUrl}/members`, { params });
  }
}
