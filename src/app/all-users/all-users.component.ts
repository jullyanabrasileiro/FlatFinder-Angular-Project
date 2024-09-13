import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  filters = {
    userType: 'all',
    minAge: null,
    maxAge: null,
    minFlats: null,
    maxFlats: null,
    isAdmin: 'all',
  };
  sortField: keyof User | 'age' = 'firstName'; 
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
      this.filteredUsers = [...this.users];
    });
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  applyFilters() {
    this.filteredUsers = this.users.filter((user) => {
      const age = this.calculateAge(user.birthDate);
      const matchesUserType =
        this.filters.userType === 'all' ||
        (this.filters.userType === 'admin' ? user.isAdmin : !user.isAdmin);
      const matchesAge =
        (!this.filters.minAge || age >= this.filters.minAge) &&
        (!this.filters.maxAge || age <= this.filters.maxAge);
      const matchesFlats =
        (!this.filters.minFlats || user.flatsCounter >= this.filters.minFlats) &&
        (!this.filters.maxFlats || user.flatsCounter <= this.filters.maxFlats);
      const matchesIsAdmin =
        this.filters.isAdmin === 'all' ||
        (this.filters.isAdmin === 'true' ? user.isAdmin : !user.isAdmin);
      return matchesUserType && matchesAge && matchesFlats && matchesIsAdmin;
    });
  }

  sort(field: keyof User | 'age') {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }

    this.filteredUsers.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      if (field === 'age') {
        valueA = this.calculateAge(a.birthDate);
        valueB = this.calculateAge(b.birthDate);
      } else {
        valueA = a[field];
        valueB = b[field];
      }

      if (this.sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }

  grantAdmin(user: User) {
    console.log(`Grant admin to: ${user.firstName} ${user.lastName}`);
  }

  removeUser(user: User) {
    console.log(`Remove user: ${user.firstName} ${user.lastName}`);
  }

  viewProfile(user: User) {
    console.log(`Viewing profile of: ${user.firstName} ${user.lastName}`);
  }
}
