export interface CreateRouteStopInterface {
  stop_id: number;
  route_id: number;
  distance_from_start: number;
  time_from_start: string;
  is_starting_point?: boolean;
  is_destination?: boolean;
}
