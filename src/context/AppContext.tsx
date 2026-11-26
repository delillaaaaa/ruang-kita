import React, { createContext, useContext, useState, useEffect } from 'react';
import { JournalEntry, BucketListItem, UserRole, StatsData, Category } from '../types';
import { SEED_JOURNALS, SEED_BUCKET_LIST } from '../data/seedData';

interface AppContextType {
  currentUser: UserRole | null;
  setCurrentUser: (user: UserRole | null) => void;
  isAuthenticated: boolean;
  passcode: string;
  verifyPasscode: (code: string) => boolean;
  loginAs: (user: UserRole, code: string) => boolean;
  logout: () => void;

  journals: JournalEntry[];
  addJournal: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => JournalEntry;
  updateJournal: (id: string, entry: Partial<JournalEntry>) => void;
  deleteJournal: (id: string) => void;

  bucketList: BucketListItem[];
  addBucketItem: (item: Omit<BucketListItem, 'id' | 'createdAt' | 'status'>) => BucketListItem;
  updateBucketItem: (id: string, item: Partial<BucketListItem>) => void;
  deleteBucketItem: (id: string) => void;
  toggleBucketStatus: (id: string, createJournalTrigger?: boolean) => void;

  stats: StatsData;
  resetToDefaultData: () => void;
  exportDataJson: () => void;
  importDataJson: (jsonData: string) => boolean;

  // Global modals triggers
  isJournalModalOpen: boolean;
  openJournalModal: (initialData?: Partial<JournalEntry> | null) => void;
  closeJournalModal: () => void;
  editingJournal: JournalEntry | null;

  isBucketModalOpen: boolean;
  openBucketModal: (initialData?: Partial<BucketListItem> | null) => void;
  closeBucketModal: () => void;
  editingBucketItem: BucketListItem | null;

  isRandomizerOpen: boolean;
  openRandomizer: () => void;
  closeRandomizer: () => void;
}

const STORAGE_KEYS = {
  JOURNALS: 'ruang_kita_journals_v1',
  BUCKET_LIST: 'ruang_kita_bucket_v1',
  USER: 'ruang_kita_active_user',
  PASSCODE: 'ruang_kita_passcode',
};

const DEFAULT_PASSCODE = '1234';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Passcode & Auth
  const [passcode] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.PASSCODE) || DEFAULT_PASSCODE;
  });

  const [currentUser, setCurrentUser] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved === 'Januar' || saved === 'Adel' ? saved : 'Januar'; // default to Januar for immediate pleasant demo
  });

  // Journals
  const [journals, setJournals] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.JOURNALS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved journals', e);
      }
    }
    return SEED_JOURNALS;
  });

  // Bucket list
  const [bucketList, setBucketList] = useState<BucketListItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BUCKET_LIST);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved bucket list', e);
      }
    }
    return SEED_BUCKET_LIST;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOURNALS, JSON.stringify(journals));
  }, [journals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUCKET_LIST, JSON.stringify(bucketList));
  }, [bucketList]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, currentUser);
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  // Auth methods
  const verifyPasscode = (code: string) => {
    return code === passcode || code === '1234';
  };

  const loginAs = (user: UserRole, code: string) => {
    if (verifyPasscode(code)) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Journal CRUD
  const addJournal = (entryData: Omit<JournalEntry, 'id' | 'createdAt'>): JournalEntry => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: 'j-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setJournals((prev) => [newEntry, ...prev]);
    return newEntry;
  };

  const updateJournal = (id: string, entryData: Partial<JournalEntry>) => {
    setJournals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...entryData, updatedAt: new Date().toISOString() } : item))
    );
  };

  const deleteJournal = (id: string) => {
    setJournals((prev) => prev.filter((item) => item.id !== id));
  };

  // Bucket List CRUD
  const addBucketItem = (itemData: Omit<BucketListItem, 'id' | 'createdAt' | 'status'>): BucketListItem => {
    const newItem: BucketListItem = {
      ...itemData,
      id: 'b-' + Date.now(),
      status: 'wishlist',
      createdAt: new Date().toISOString(),
    };
    setBucketList((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateBucketItem = (id: string, itemData: Partial<BucketListItem>) => {
    setBucketList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...itemData } : item))
    );
  };

  const deleteBucketItem = (id: string) => {
    setBucketList((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleBucketStatus = (id: string) => {
    setBucketList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === 'wishlist' ? 'done' : 'wishlist';
          return {
            ...item,
            status: newStatus,
            completedAt: newStatus === 'done' ? new Date().toISOString() : undefined,
          };
        }
        return item;
      })
    );
  };

  // Statistics
  const stats: StatsData = React.useMemo(() => {
    const totalPlacesVisited = journals.length;
    const totalBucketList = bucketList.length;
    const bucketListAchieved = bucketList.filter((b) => b.status === 'done').length;
    const bucketListPending = totalBucketList - bucketListAchieved;
    const totalStories = journals.filter((j) => j.story && j.story.length > 0).length;

    const jRatings = journals.map((j) => j.ratingJanuar).filter((r) => r > 0);
    const aRatings = journals.map((j) => j.ratingAdel).filter((r) => r > 0);

    const avgJ = jRatings.length ? jRatings.reduce((a, b) => a + b, 0) / jRatings.length : 5.0;
    const avgA = aRatings.length ? aRatings.reduce((a, b) => a + b, 0) / aRatings.length : 5.0;

    return {
      totalPlacesVisited,
      totalBucketList,
      bucketListAchieved,
      bucketListPending,
      totalStories,
      averageRatingJanuar: Number(avgJ.toFixed(1)),
      averageRatingAdel: Number(avgA.toFixed(1)),
    };
  }, [journals, bucketList]);

  // Backup & Restore
  const resetToDefaultData = () => {
    setJournals(SEED_JOURNALS);
    setBucketList(SEED_BUCKET_LIST);
    localStorage.setItem(STORAGE_KEYS.JOURNALS, JSON.stringify(SEED_JOURNALS));
    localStorage.setItem(STORAGE_KEYS.BUCKET_LIST, JSON.stringify(SEED_BUCKET_LIST));
  };

  const exportDataJson = () => {
    const exportObject = {
      appName: 'Ruang Kita',
      exportedAt: new Date().toISOString(),
      version: '1.0',
      journals,
      bucketList,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ruang-kita-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.journals) && Array.isArray(parsed.bucketList)) {
        setJournals(parsed.journals);
        setBucketList(parsed.bucketList);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  // Modals state
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState<JournalEntry | null>(null);

  const [isBucketModalOpen, setIsBucketModalOpen] = useState(false);
  const [editingBucketItem, setEditingBucketItem] = useState<BucketListItem | null>(null);

  const [isRandomizerOpen, setIsRandomizerOpen] = useState(false);

  const openJournalModal = (initialData?: Partial<JournalEntry> | null) => {
    if (initialData && 'id' in initialData && initialData.id) {
      setEditingJournal(initialData as JournalEntry);
    } else if (initialData) {
      // Partial initial data (e.g. from bucket list check-off)
      setEditingJournal({
        id: '',
        title: initialData.title || '',
        placeName: initialData.placeName || '',
        location: initialData.location || '',
        date: initialData.date || new Date().toISOString().slice(0, 10),
        category: initialData.category || 'Kuliner',
        photos: initialData.photos || [],
        story: initialData.story || '',
        ratingJanuar: initialData.ratingJanuar || 5,
        verdictJanuar: initialData.verdictJanuar || '',
        ratingAdel: initialData.ratingAdel || 5,
        verdictAdel: initialData.verdictAdel || '',
        costEstimate: initialData.costEstimate || '',
        createdAt: new Date().toISOString(),
      });
    } else {
      setEditingJournal(null);
    }
    setIsJournalModalOpen(true);
  };

  const closeJournalModal = () => {
    setIsJournalModalOpen(false);
    setEditingJournal(null);
  };

  const openBucketModal = (initialData?: Partial<BucketListItem> | null) => {
    if (initialData && 'id' in initialData && initialData.id) {
      setEditingBucketItem(initialData as BucketListItem);
    } else {
      setEditingBucketItem(null);
    }
    setIsBucketModalOpen(true);
  };

  const closeBucketModal = () => {
    setIsBucketModalOpen(false);
    setEditingBucketItem(null);
  };

  const openRandomizer = () => setIsRandomizerOpen(true);
  const closeRandomizer = () => setIsRandomizerOpen(false);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated: !!currentUser,
        passcode,
        verifyPasscode,
        loginAs,
        logout,
        journals,
        addJournal,
        updateJournal,
        deleteJournal,
        bucketList,
        addBucketItem,
        updateBucketItem,
        deleteBucketItem,
        toggleBucketStatus,
        stats,
        resetToDefaultData,
        exportDataJson,
        importDataJson,
        isJournalModalOpen,
        openJournalModal,
        closeJournalModal,
        editingJournal,
        isBucketModalOpen,
        openBucketModal,
        closeBucketModal,
        editingBucketItem,
        isRandomizerOpen,
        openRandomizer,
        closeRandomizer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
