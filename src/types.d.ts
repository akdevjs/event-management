interface EventType {
  relevance: number;
  id: string;
  title: string;
  description: string;
  category: string;
  labels: string[];
  rank: number;
  local_rank: number | null;
  phq_attendance: any;
  entities: Entity[];
  duration: number;
  start: string;
  end: string;
  updated: string;
  first_seen: string;
  timezone: string | null;
  location: [number, number];
  geo: {
    geometry: {
      coordinates: [number, number];
      type: string;
    };
  };
  scope: string;
  country: string;
  place_hierarchies: string[][];
  state: string;
  brand_safe: boolean;
  private: boolean;
  phq_labels: { label: string; weight: number }[];
  address?: string;
}

interface Entity {
  entity_id: string;
  name: string;
  type: string;
  category: string;
  labels: string[];
  recurring?: {
    ical: string;
  };
}
