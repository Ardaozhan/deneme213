import React from 'react';

const RaceForm = ({ races, loading, error }) => {
  // Eğer veriler yükleniyorsa veya bir hata varsa, uygun mesajları gösteriyoruz.
  if (loading) {
    return <div>Yarışlar yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Günün Yarışları</h2>
      <table>
        <thead>
          <tr>
            <th>Yarış No</th>
            <th>Yarış Adı</th>
            <th>Başlangıç Saati</th>
            <th>Atlar</th>
          </tr>
        </thead>
        <tbody>
          {races && races.length > 0 ? (
            races.map((race, index) => (
              <tr key={index}>
                <td>{race.race_number}</td>
                <td>{race.race_name}</td>
                <td>{race.start_time}</td>
                <td>
                  <ul>
                    {race.horses.map((horse, idx) => (
                      <li key={idx}>{horse.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Yarış bilgisi bulunamadı.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RaceForm;
