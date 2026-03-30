"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Clock,
  Users,
  Star,
  Ticket,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

// Types
interface SupportAct {
  name: string;
  image?: string;
}

interface TourDate {
  id: string;
  tourName: string | null;
  venue: string;
  city: string;
  state: string | null;
  country: string;
  date: Date;
  time: string | null;
  doors: string | null;
  ticketUrl: string | null;
  ticketUrlLocal: string | null;
  ticketPrice: string | null;
  ticketPriceMin: string | null;
  ticketPriceMax: string | null;
  status:
    | "announced"
    | "on_sale"
    | "sold_out"
    | "completed"
    | "cancelled"
    | "postponed";
  capacity: number | null;
  soldTickets: number | null;
  supportActs: SupportAct[] | null;
  ageRestriction: string | null;
  vipAvailable: boolean;
  vipDescription: string | null;
  featured: boolean;
  active: boolean;
  notes: string | null;
}

interface TourDateCardProps {
  tourDate: TourDate;
  onGetTickets?: (tourDate: TourDate) => void;
  onAddToCalendar?: (
    tourDate: TourDate,
    calendarType: "google" | "apple" | "outlook",
  ) => void;
  onViewOnMap?: (tourDate: TourDate) => void;
}

// Status Badge Component
const StatusBadge: React.FC<{ status: TourDate["status"] }> = ({ status }) => {
  const statusConfig = {
    announced: {
      label: "Just Announced",
      className: "bg-gradient-to-r from-blue-600 to-cyan-600 text-white",
    },
    on_sale: {
      label: "On Sale Now",
      className: "bg-gradient-to-r from-green-600 to-emerald-600 text-white",
    },
    sold_out: {
      label: "Sold Out",
      className: "bg-gradient-to-r from-red-600 to-rose-600 text-white",
    },
    completed: {
      label: "Completed",
      className: "bg-gray-600 text-white",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-gray-800 text-white",
    },
    postponed: {
      label: "Postponed",
      className: "bg-gradient-to-r from-amber-600 to-orange-600 text-white",
    },
  };

  const config = statusConfig[status];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${config.className}`}
    >
      {config.label}
    </motion.span>
  );
};

// Age Restriction Badge Component
const AgeRestrictionBadge: React.FC<{ ageRestriction: string | null }> = ({
  ageRestriction,
}) => {
  if (!ageRestriction) return null;

  const getAgeIcon = () => {
    if (ageRestriction === "all_ages")
      return <CheckCircle2 className="w-3 h-3" />;
    if (ageRestriction.includes("+"))
      return <AlertCircle className="w-3 h-3" />;
    return <Users className="w-3 h-3" />;
  };

  const formatAgeRestriction = () => {
    if (ageRestriction === "all_ages") return "All Ages";
    if (ageRestriction === "18+") return "18+";
    if (ageRestriction === "21+") return "21+";
    if (ageRestriction === "16+") return "16+";
    return ageRestriction;
  };

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">
      {getAgeIcon()}
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
        {formatAgeRestriction()}
      </span>
    </div>
  );
};

// VIP Badge Component
const VIPBadge: React.FC<{ vipDescription: string | null }> = ({
  vipDescription,
}) => {
  if (!vipDescription) return null;

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/30 rounded-md">
      <Star className="w-3 h-3 text-purple-600 dark:text-purple-400" />
      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
        VIP Available
      </span>
    </div>
  );
};

// Ticket Availability Component
const TicketAvailability: React.FC<{
  status: TourDate["status"];
  capacity: number | null;
  soldTickets: number | null;
}> = ({ status, capacity, soldTickets }) => {
  if (
    status === "sold_out" ||
    status === "cancelled" ||
    status === "completed"
  ) {
    return null;
  }

  if (!capacity || !soldTickets) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Ticket className="w-4 h-4" />
        <span>Tickets Available</span>
      </div>
    );
  }

  const percentageSold = (soldTickets / capacity) * 100;
  const remainingTickets = capacity - soldTickets;
  const isLowAvailability = percentageSold > 70;
  const isVeryLow = percentageSold > 90;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          {remainingTickets} tickets left
        </span>
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {Math.round(percentageSold)}% sold
        </span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentageSold}%` }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`h-full rounded-full ${
            isVeryLow
              ? "bg-gradient-to-r from-red-600 to-rose-600"
              : isLowAvailability
                ? "bg-gradient-to-r from-amber-600 to-orange-600"
                : "bg-gradient-to-r from-green-600 to-emerald-600"
          }`}
        />
      </div>
      {isVeryLow && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-red-600 dark:text-red-400 font-medium"
        >
          Selling fast!
        </motion.p>
      )}
    </div>
  );
};

// Support Acts Component
const SupportActsList: React.FC<{ supportActs: SupportAct[] | null }> = ({
  supportActs,
}) => {
  if (!supportActs || supportActs.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Support Acts
      </h4>
      <div className="flex flex-wrap gap-2">
        {supportActs.map((act, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            {act.image ? (
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={act.image}
                  alt={act.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
                {act.name.charAt(0)}
              </div>
            )}
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {act.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
export const TourDateCard: React.FC<TourDateCardProps> = ({
  tourDate,
  onGetTickets,
  onAddToCalendar,
  onViewOnMap,
}) => {
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (time: string | null) => {
    if (!time) return null;
    return time;
  };

  const getPriceRange = () => {
    if (!tourDate.ticketPrice) {
      if (tourDate.ticketPriceMin && tourDate.ticketPriceMax) {
        return `€${tourDate.ticketPriceMin} - €${tourDate.ticketPriceMax}`;
      }
      return "TBA";
    }
    return `€${tourDate.ticketPrice}`;
  };

  const isActionable =
    tourDate.status === "on_sale" || tourDate.status === "announced";

  const handleAddToCalendar = (
    calendarType: "google" | "apple" | "outlook",
  ) => {
    onAddToCalendar?.(tourDate, calendarType);
    setShowCalendarOptions(false);
  };

  const getVenueLocation = () => {
    const parts = [tourDate.city, tourDate.state, tourDate.country].filter(
      Boolean,
    );
    return parts.join(", ");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${
        tourDate.featured
          ? "border-purple-500 dark:border-purple-400 shadow-purple-500/20"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      {/* Featured Badge */}
      {tourDate.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg">
            Featured Show
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div
        className={`absolute top-4 ${tourDate.featured ? "right-4" : "left-4"} z-10`}
      >
        <StatusBadge status={tourDate.status} />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Date Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl text-white shadow-lg">
              <span className="text-xs font-medium uppercase">
                {new Intl.DateTimeFormat("en-US", { month: "short" }).format(
                  tourDate.date,
                )}
              </span>
              <span className="text-2xl font-bold">
                {new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
                  tourDate.date,
                )}
              </span>
              <span className="text-xs">
                {new Intl.DateTimeFormat("en-US", { year: "2-digit" }).format(
                  tourDate.date,
                )}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {tourDate.venue}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{getVenueLocation()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tour Name */}
        {tourDate.tourName && (
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <Ticket className="w-4 h-4" />
            <span className="text-sm font-medium">{tourDate.tourName}</span>
          </div>
        )}

        {/* Time Details */}
        {(tourDate.time || tourDate.doors) && (
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {tourDate.doors && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Doors: {formatTime(tourDate.doors)}</span>
              </div>
            )}
            {tourDate.time && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Show: {formatTime(tourDate.time)}</span>
              </div>
            )}
          </div>
        )}

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <AgeRestrictionBadge ageRestriction={tourDate.ageRestriction} />
          <VIPBadge vipDescription={tourDate.vipDescription} />
        </div>

        {/* Ticket Availability */}
        <TicketAvailability
          status={tourDate.status}
          capacity={tourDate.capacity}
          soldTickets={tourDate.soldTickets}
        />

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Price:
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {getPriceRange()}
          </span>
        </div>

        {/* Support Acts */}
        <SupportActsList supportActs={tourDate.supportActs} />

        {/* Notes */}
        {tourDate.notes && (
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            {tourDate.notes}
          </p>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {isActionable && tourDate.status !== "sold_out" ? (
            <>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => onGetTickets?.(tourDate)}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Get Tickets
                </Button>
              </motion.div>

              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setShowCalendarOptions(!showCalendarOptions)}
                    className="w-full"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => onViewOnMap?.(tourDate)}
                    className="w-full"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View Map
                  </Button>
                </motion.div>
              </div>

              {/* Calendar Options Dropdown */}
              {showCalendarOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-3 gap-2"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToCalendar("google")}
                    className="text-xs"
                  >
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToCalendar("apple")}
                    className="text-xs"
                  >
                    Apple
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToCalendar("outlook")}
                    className="text-xs"
                  >
                    Outlook
                  </Button>
                </motion.div>
              )}
            </>
          ) : tourDate.status === "sold_out" ? (
            <Button
              disabled
              className="w-full h-12 text-base font-semibold bg-gray-400 cursor-not-allowed"
            >
              <XCircle className="w-5 h-5 mr-2" />
              Sold Out
            </Button>
          ) : tourDate.status === "announced" ? (
            <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Tickets coming soon
              </p>
            </div>
          ) : (
            <Button
              disabled
              className="w-full h-12 text-base font-semibold bg-gray-400 cursor-not-allowed"
            >
              {tourDate.status === "cancelled" ? "Cancelled" : "Completed"}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TourDateCard;
