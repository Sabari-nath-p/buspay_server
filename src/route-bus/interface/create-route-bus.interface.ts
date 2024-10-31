export interface CreateRouteBusInterface {
  route_id: number;
  bus_id: number;
  start_timing: string;
  finish_timing?: string;
  days_of_week: string[];
}
