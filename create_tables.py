from App.database.connection import Base, engine
from App.models.document import Document

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Database tables created successfully!")