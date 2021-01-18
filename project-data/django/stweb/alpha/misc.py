

class TDelta (object) :
    def __init__(self,numb):
        self.lookup=[(31536000000,"yr"),(86400000,"day"),(3600000,"hr"),(60000,"min"),(1000,"sec") ]
        self. res = {}
        self.time_span(numb,0)

    def time_span(self,d,n) :
        limit = 4
        cnt = 0
        rem = d
        x = self.lookup[n][0]
        if d>x :
            cnt = (d/x) 
            rem = (d%x)
        n+=1
        if n<= limit :
            self.time_span(rem,n)
        
        if cnt :
            self.res[self.lookup[n-1][1]] = int(cnt)
        else :
            self.res[self.lookup[n-1][1]] = 0
