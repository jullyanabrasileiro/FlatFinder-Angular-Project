import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Adjust the path as necessary

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  filters = {
    userType: 'all',
    minAge: null,
    maxAge: null,
    minFlats: null,
    maxFlats: null,
    isAdmin: 'all'
  };
  sortOrder = 'asc';
  sortField = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((users: any[]) => {
      this.users = users;
      this.filteredUsers = [...this.users];
    });
  }

  calculateAge(birthDate: Date): number {
    const currentDate = new Date();
    const birth = new Date(birthDate);
    return currentDate.getFullYear() - birth.getFullYear();
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const age = this.calculateAge(user.birthDate);
      const matchesAge = (!this.filters.minAge || age >= this.filters.minAge) && (!this.filters.maxAge || age <= this.filters.maxAge);
      const matchesFlats = (!this.filters.minFlats || user.flatsCounter >= this.filters.minFlats) && (!this.filters.maxFlats || user.flatsCounter <= this.filters.maxFlats);
      const matchesAdmin = this.filters.isAdmin === 'all' || user.isAdmin === (this.filters.isAdmin === 'true');
      const matchesUserType = this.filters.userType === 'all' || (this.filters.userType === 'admin' ? user.isAdmin : !user.isAdmin);
      return matchesAge && matchesFlats && matchesAdmin && matchesUserType;
    });
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.filteredUsers.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
  }

  grantAdmin(user: any) {

  }

  removeUser(user: any) {

  }

  viewProfile(user: any) {

  }
}
