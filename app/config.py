class Config:
    def __init__(self, UID, PWD, SKEY):
        self.SECRET_KEY=SKEY
        self.MONGODB_URL=f'mongodb+srv://{UID}:{PWD}@data-server.ga0aili.mongodb.net/?retryWrites=true&w=majority&appName=data-server'