## DropSort algorithm
## O(n log n) -- good constants for data with some ordering;
##               bad for randomly-distributed data
##
## (c)2009 Jeremiah Kent
## ibiwan@gmail.com
##
## inspired by David Morgan-Mar's Dropsort algorithm,
## found at http://www.dangermouse.net/esoteric/dropsort.html

class stats:
    def __init__(self):
        self.comparisons = 0;   self.copies = 0;   self.merges = 0
    def __str__(self):
        return (str(self.comparisons) +  " comparisons; " + 
                str(self.copies)      +  " copies; "      +
                str(self.merges)      +  " merges")

_ = "bookkeeping lines"

def merge(amy, ben, stats):
    _                                                                           ;stats.merges += 1
    Carrington = [];   a = 0;   b = 0    #init
    lena = len(amy);   lenb = len(ben)   #memoize
    while(a < lena and b < lenb):        #merge
        _                                                                       ;stats.comparisons += 1
        if(amy[a] <= ben[b]):
            _                                                                   ;stats.copies += 1
            Carrington.append(amy[a]);   a += 1
        else:
            _                                                                   ;stats.copies += 1
            Carrington.append(ben[b]);   b += 1
    _                                                                           ;stats.copies += 1
    #leftovers (O(1) with linked lists)
    Carrington.extend(amy[a:lena])
    Carrington.extend(ben[b:lenb])
    return Carrington

def dropsort(lst,  stats):
    if(len(lst)<2): return lst           #base case
    up = [];   dn = [];   prev = None    #init
    for i in lst:
        _                                                                       ;stats.comparisons += 1
        if(prev is None or i >= prev):
            _                                                                   ;stats.copies += 1
            up.append(i);   prev = i
        else:
            _                                                                   ;stats.copies += 1
            #prepend (O(1) with linked lists)
            dn.insert(0, i)
    return merge(up, dropsort(dn, stats), stats)

#implemented for comparison
def mergesort(lst, stats):
    if(len(lst)<2):  return lst
    mid = len(lst)/2
    return merge(mergesort(lst[:mid], stats),
                 mergesort(lst[mid:], stats), stats)

#use drop sort for the first two recursion levels in case there's already ordered data, then merge remainder
def hybrid(lst,  stats, stage = 0):
    if(len(lst)<2): return lst           #base case
    if(stage > 1):  return mergesort(lst, stats)
    up = [];   dn = [];   prev = None    #init
    for i in lst:
        _                                                                       ;stats.comparisons += 1
        if(prev is None or i >= prev):
            _                                                                   ;stats.copies += 1
            up.append(i);   prev = i
        else:
            _                                                                   ;stats.copies += 1
            #prepend (O(1) with linked lists)
            dn.insert(0, i)
    return merge(up, hybrid(dn, stats, stage + 1), stats)

#assumes values in range [0, 1)
def printsort(lst, name = None): 
    if(not name is None): print name
    for i in lst:         print " "*int(i*80), i
    print
