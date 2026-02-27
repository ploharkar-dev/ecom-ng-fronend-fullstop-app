import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: number;
  userId: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
}

export interface UpdateProfileRequest {
  name: string;
  phone: string;
  avatar?: string;
}

export interface CreateAddressRequest {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private api: ApiService) { }

  getUserProfile(): Observable<UserProfile> {
    return this.api.get<UserProfile>('/users/profile');
  }

  updateProfile(data: UpdateProfileRequest): Observable<UserProfile> {
    return this.api.put<UserProfile>('/users/profile', data);
  }

  getAddresses(): Observable<Address[]> {
    return this.api.get<Address[]>('/users/addresses');
  }

  addAddress(address: CreateAddressRequest): Observable<Address> {
    return this.api.post<Address>('/users/addresses', address);
  }

  updateAddress(addressId: number, address: Partial<CreateAddressRequest>): Observable<Address> {
    return this.api.put<Address>(`/users/addresses/${addressId}`, address);
  }

  deleteAddress(addressId: number): Observable<any> {
    return this.api.delete<any>(`/users/addresses/${addressId}`);
  }

  changePassword(data: ChangePasswordRequest): Observable<any> {
    return this.api.post<any>('/users/change-password', data);
  }
}
