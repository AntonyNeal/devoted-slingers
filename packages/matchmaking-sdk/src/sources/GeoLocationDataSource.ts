import { GeoLocation, GeoDistance, BaseDataSource } from '../types';

export abstract class GeoLocationDataSource implements BaseDataSource {
  abstract initialize(): Promise<void>;
  abstract cleanup(): Promise<void>;

  abstract calculateDistance(point1: GeoLocation, point2: GeoLocation): GeoDistance;
  abstract geocodeAddress(address: string): Promise<GeoLocation | null>;
  abstract reverseGeocode(location: GeoLocation): Promise<{ city?: string; country?: string }>;
  abstract findNearby(location: GeoLocation, radiusKm: number, userIds: string[]): Promise<string[]>;
}
