package com.cezaram28.Assignment1.event;

import com.cezaram28.Assignment1.dto.QuestionDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class QuestionUpdatedEvent extends BaseEvent {
    private final QuestionDTO questionDTO;

    public QuestionUpdatedEvent(QuestionDTO questionDTO) {
        super(EventType.QUESTION_UPDATED);
        this.questionDTO = questionDTO;
    }
}
