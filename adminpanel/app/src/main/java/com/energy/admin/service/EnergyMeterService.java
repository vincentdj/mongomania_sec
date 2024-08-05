package com.energy.admin.service;

import com.energy.admin.model.EnergyMeter;
import com.energy.admin.repository.EnergyMeterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnergyMeterService {

    @Autowired
    private EnergyMeterRepository energyMeterRepository;

    public List<EnergyMeter> searchEnergyMeters(String query) {
        return energyMeterRepository.findByMeterIdContaining(query);
    }

    public List<EnergyMeter> getAllEnergyMeters() {
        return energyMeterRepository.findAll();
    }

    public EnergyMeter saveEnergyMeter(EnergyMeter energyMeter) {
        return energyMeterRepository.save(energyMeter);
    }

    public EnergyMeter updateEnergyMeter(Long id, EnergyMeter energyMeterDetails) {
        EnergyMeter energyMeter = energyMeterRepository.findById(id).orElseThrow(() -> new RuntimeException("EnergyMeter not found"));
        energyMeter.setMeterId(energyMeterDetails.getMeterId());
        energyMeter.setLocation(energyMeterDetails.getLocation());
        energyMeter.setStatus(energyMeterDetails.getStatus());
        return energyMeterRepository.save(energyMeter);
    }

    public void deleteEnergyMeter(Long id) {
        energyMeterRepository.deleteById(id);
    }
}
