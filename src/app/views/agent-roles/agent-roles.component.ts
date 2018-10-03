import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Agent} from "../../models/agent";
import {Role} from "../../models/role";
import {ToggleRoleEvent} from "../manage-users/manage-users.component";

@Component({
  selector: 'agent-roles',
  templateUrl: './agent-roles.component.html',
  styleUrls: ['./agent-roles.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgentRolesComponent implements OnInit {
  @Input() agent: Agent;
  @Input() roles: Role[];
  @Input() pendingOperations: string[];
  @Output() onToggleRole = new EventEmitter<ToggleRoleEvent>();

  constructor() { }

  ngOnInit() {
  }

  private toggleRole(role: Role) {
    this.onToggleRole.emit({agent: this.agent, role: role});
  }

  private hasPendingOperation(role: Role) {
    return this.pendingOperations.indexOf(role.code) > -1;
  }
}
