class Config:
    def __init__(self, MONGO_URL, SKEY):
        self.SECRET_KEY=SKEY
        self.MONGODB_URL=MONGO_URL