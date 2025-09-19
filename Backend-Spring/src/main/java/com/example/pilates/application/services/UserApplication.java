package com.example.pilates.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pilates.application.ports.ApplicationPort;
import com.example.pilates.application.ports.SQLUserPort;

@Service
public class UserApplication implements ApplicationPort {
    
    @Autowired
    private SQLUserPort sqlUser;

    // public UserApplication(SQLUserPort sqlUser) {
    //     this.sqlUser = sqlUser;
    // }

    // public UserApplication() {
    //     this.sqlUser = null;
    // }

    // public void setSqlUser(SQLUserPort sqlUser) {
    //     // Método para injeção manual se necessário
    // }

    @Override
    public void execute() {
        System.out.println("Executando aplicação de usuário");
        if (sqlUser != null) {
            sqlUser.saveInDB();
        }
    }
}
