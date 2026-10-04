# Privacy

The seed and experiment contain synthetic identifiers (SYN-####) and invented workflow descriptions only. Do not enter real patient data. The application minimizes record fields to workflow demonstration needs. API responses are role-controlled; passwords are bcrypt-hashed; JWT secrets belong in the local `.env`; important changes are audit logged. Consent acknowledgements are stored per user.

Demo retention is the lifetime of the local database volume. `docker compose down -v` removes its PostgreSQL data. A production system would require approved retention/deletion policies, privacy/security assessment, access review, encryption and key management, incident response, backup/restore testing, legal basis, and jurisdictional regulatory review. This prototype is not a production clinical system.
